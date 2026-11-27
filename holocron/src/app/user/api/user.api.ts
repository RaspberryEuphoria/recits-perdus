import express from 'express';
import createHttpError from 'http-errors';

import { asyncHandler, parseId, pick, requireAuth, requireString } from '../../../services/http';
import { UserContainer } from '../user.container';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

/** Editable identity fields of a character. Skills, stats and owner are never writable here. */
type CharacterFields = {
  firstName?: string;
  lastName?: string;
  title?: string;
  isTitleSuffix?: boolean;
  origin?: string;
  story?: string;
  age?: number;
};

function optionalString(value: unknown, name: string, maxLength: number) {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') throw createHttpError.BadRequest(`Invalid ${name}`);
  if (value.length > maxLength) throw createHttpError.BadRequest(`${name} is too long`);
  return value;
}

function parseCharacterFields(body: Record<string, unknown>): CharacterFields {
  const fields: CharacterFields = {
    firstName: optionalString(body.firstName, 'firstName', 255),
    lastName: optionalString(body.lastName, 'lastName', 255),
    title: optionalString(body.title, 'title', 255),
    origin: optionalString(body.origin, 'origin', 255),
    story: optionalString(body.story, 'story', 50_000),
    isTitleSuffix: body.isTitleSuffix === undefined ? undefined : Boolean(body.isTitleSuffix),
  };

  if (body.age !== undefined) {
    const age = parseInt(String(body.age), 10);
    if (!Number.isInteger(age) || age < 0 || age > 100_000) {
      throw createHttpError.BadRequest('Invalid age');
    }
    fields.age = age;
  }

  return pick(fields, Object.keys(fields) as Array<keyof CharacterFields>);
}

/** Throws 403 unless the logged user is the :userId of the route. */
function assertSameUser(req: express.Request, userId: number) {
  if (req.loggedUser?.id !== userId) {
    throw createHttpError.Forbidden('You can only manage your own characters');
  }
}

function userRoutes(userContainer: UserContainer) {
  const router = express.Router();

  router.get(
    '/stats',
    asyncHandler(async (_req, res) => {
      res.json(await userContainer.getStats());
    }),
  );

  router.post(
    `/register`,
    asyncHandler(async (req, res) => {
      const email = requireString(req.body?.email, 'email').trim().toLowerCase();
      const name = requireString(req.body?.name, 'name').trim();
      const password = requireString(req.body?.password, 'password', 200);

      if (!EMAIL_REGEX.test(email)) throw createHttpError.BadRequest('Invalid email');
      if (password.length < MIN_PASSWORD_LENGTH) {
        throw createHttpError.BadRequest(
          `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
        );
      }

      res.json(await userContainer.register({ email, name, password }));
    }),
  );

  router.post(
    `/login`,
    asyncHandler(async (req, res) => {
      const email = requireString(req.body?.email, 'email').trim();
      const password = requireString(req.body?.password, 'password', 200);

      res.json(await userContainer.login({ email, password }));
    }),
  );

  router.get(
    '/:id/characters',
    asyncHandler(async (req, res) => {
      res.json(await userContainer.getCharacters(parseId(req.params.id)));
    }),
  );

  router.get(
    '/:id/characters/:characterId',
    asyncHandler(async (req, res) => {
      const character = await userContainer.getCharacter(
        parseId(req.params.id),
        parseId(req.params.characterId, 'characterId'),
      );
      res.json(character);
    }),
  );

  router.put(
    '/:userId/characters/:characterId',
    requireAuth,
    asyncHandler(async (req, res) => {
      const userId = parseId(req.params.userId, 'userId');
      const characterId = parseId(req.params.characterId, 'characterId');
      assertSameUser(req, userId);
      // throws if the character does not exist or belongs to someone else
      await userContainer.getCharacter(userId, characterId);

      const character = await userContainer.updateCharacter({
        ...parseCharacterFields(req.body ?? {}),
        userId,
        id: characterId,
      });

      res.json(character);
    }),
  );

  router.put(
    '/:userId/characters/:characterId/avatar',
    requireAuth,
    asyncHandler(async (req, res) => {
      const userId = parseId(req.params.userId, 'userId');
      const characterId = parseId(req.params.characterId, 'characterId');
      assertSameUser(req, userId);
      await userContainer.getCharacter(userId, characterId);

      const newAvatar = await userContainer.updateCharacterAvatar({
        base64Avatar: requireString(req.body?.base64Avatar, 'base64Avatar', 7_000_000),
        crop: req.body?.crop,
        userId,
        id: characterId,
      });

      res.json({ avatar: newAvatar });
    }),
  );

  router.post(
    '/:id/characters',
    requireAuth,
    asyncHandler(async (req, res) => {
      const userId = parseId(req.params.id);
      assertSameUser(req, userId);

      const fields = parseCharacterFields(req.body ?? {});
      const firstName = requireString(fields.firstName, 'firstName');

      const skills = req.body?.skills;
      if (!Array.isArray(skills)) throw createHttpError.BadRequest('skills is required');

      const character = await userContainer.createCharacter({
        story: '',
        origin: '',
        title: '',
        lastName: '',
        isTitleSuffix: false,
        age: 0,
        ...fields,
        firstName,
        userId,
        skills: skills.map((skillId: unknown) => parseId(skillId, 'skill id')),
      });

      res.json(character);
    }),
  );

  return router;
}

export { userRoutes };
