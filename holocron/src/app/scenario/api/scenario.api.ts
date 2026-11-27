import { NoteCategory } from '@prisma/client';
import express from 'express';
import createHttpError from 'http-errors';

import { asyncHandler, parseId, requireAuth, requireString } from '../../../services/http';
import { MoveId, MoveIntent } from '../domain/post/entities/move';
import { ScenarioStatus } from '../domain/scenario/entities/scenario';
import { ScenarioContainer } from '../scenario.container';

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
const MAX_POST_LENGTH = 20_000;
const PLAYER_MOVES = Object.values(MoveId).filter((id) => id !== MoveId.PAYER_LE_PRIX);

function isScenarioStatusAllowed(status: unknown): status is ScenarioStatus {
  return Object.values(ScenarioStatus).includes(status as ScenarioStatus);
}

function parseTextColor(value: unknown) {
  if (typeof value !== 'string' || !HEX_COLOR.test(value)) {
    throw createHttpError.BadRequest('Invalid textColor');
  }
  return value;
}

function optionalString(value: unknown, name: string, maxLength: number) {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string') throw createHttpError.BadRequest(`Invalid ${name}`);
  if (value.length > maxLength) throw createHttpError.BadRequest(`${name} is too long`);
  return value;
}

function parseNoteFields(body: Record<string, unknown>, { partial }: { partial: boolean }) {
  const category = body.category;
  if (category !== undefined || !partial) {
    if (!Object.values(NoteCategory).includes(category as NoteCategory)) {
      throw createHttpError.BadRequest('Invalid category');
    }
  }

  const fields = {
    title: partial
      ? optionalString(body.title, 'title', 255)
      : requireString(body.title, 'title', 255),
    subtitle: optionalString(body.subtitle, 'subtitle', 255),
    description: optionalString(body.description, 'description', 20_000),
    category: category as NoteCategory | undefined,
  };

  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined),
  ) as Partial<typeof fields>;
}

/**
 * Only the move id and the player's choices are accepted; dice and results are computed server-side.
 */
function parseMoveIntent(action: unknown): { move: MoveIntent } | undefined {
  if (!action || typeof action !== 'object') return undefined;
  const move = (action as { move?: unknown }).move as Partial<MoveIntent> | undefined;
  if (!move) return undefined;

  if (!PLAYER_MOVES.includes(move.id as MoveId)) {
    throw createHttpError.BadRequest('Invalid move');
  }

  const meta = (move.meta ?? {}) as Record<string, unknown>;
  if (typeof meta !== 'object') throw createHttpError.BadRequest('Invalid move meta');

  const optionalInt = (value: unknown, name: string) => {
    if (value === undefined || value === null) return undefined;
    const n = Number(value);
    if (!Number.isInteger(n)) throw createHttpError.BadRequest(`Invalid ${name}`);
    return n;
  };

  return {
    move: {
      id: move.id as MoveId,
      meta: {
        skillId: optionalInt(meta.skillId, 'skillId'),
        targetId: optionalInt(meta.targetId, 'targetId'),
        difficulty: optionalInt(meta.difficulty, 'difficulty'),
        danger:
          typeof meta.danger === 'string' || typeof meta.danger === 'number'
            ? (meta.danger as MoveIntent['meta']['danger'])
            : undefined,
        hasMomentumBurn: Boolean(meta.hasMomentumBurn),
      },
    },
  };
}

function scenarioRoutes(scenarioContainer: ScenarioContainer) {
  const router = express.Router();

  /** Throws 403 unless the logged user owns the character */
  async function assertOwnsCharacter(req: express.Request, characterId: number) {
    const userId = req.loggedUser?.id;
    if (!userId || !(await scenarioContainer.checkUserIdUsecase(characterId, userId))) {
      throw createHttpError.Forbidden('You are not the owner of this character');
    }
  }

  router.get(
    '/stats',
    asyncHandler(async (_req, res) => {
      res.json(await scenarioContainer.getStats());
    }),
  );

  // Get scenarios
  router.get(
    `/`,
    asyncHandler(async (req, res) => {
      const status = req.query.status;
      if (!isScenarioStatusAllowed(status)) {
        throw createHttpError.BadRequest('Invalid status');
      }

      res.json(await scenarioContainer.getAllScenarios(status));
    }),
  );

  // Create scenario
  router.post(
    `/`,
    requireAuth,
    asyncHandler(async (req, res) => {
      const characterId = parseId(req.body?.characterId, 'characterId');
      await assertOwnsCharacter(req, characterId);

      const scenario = await scenarioContainer.createScenario({
        title: requireString(req.body?.title, 'title', 255),
        introduction: requireString(req.body?.introduction, 'introduction', 2500),
        era: optionalString(req.body?.era, 'era', 255),
        location: optionalString(req.body?.location, 'location', 255),
        textColor: parseTextColor(req.body?.textColor),
        characterId,
      });

      res.json(scenario);
    }),
  );

  // Get scenario
  router.get(
    `/:id`,
    asyncHandler(async (req, res) => {
      const scenario = await scenarioContainer.getScenarioById(parseId(req.params.id));
      if (!scenario) throw createHttpError.NotFound('Scenario not found');
      res.json(scenario);
    }),
  );

  // Start scenario
  router.post(
    `/:id/start`,
    requireAuth,
    asyncHandler(async (req, res) => {
      await scenarioContainer.startScenario({
        scenarioId: parseId(req.params.id),
        userId: req.loggedUser!.id,
      });

      res.json({ message: 'ok' });
    }),
  );

  // Register character in scenario
  router.post(
    `/:id/character`,
    requireAuth,
    asyncHandler(async (req, res) => {
      const scenarioId = parseId(req.params.id);
      const characterId = parseId(req.body?.characterId, 'characterId');
      await assertOwnsCharacter(req, characterId);

      const scenario = await scenarioContainer.getScenarioById(scenarioId);
      if (!scenario) throw createHttpError.NotFound('Scenario not found');
      if (scenario.status !== ScenarioStatus.INITIATED) {
        throw createHttpError.Conflict('This scenario is not open to new characters');
      }
      if (scenario.characters.some((character) => character.id === characterId)) {
        throw createHttpError.Conflict('This character already joined the scenario');
      }

      const updatedScenario = await scenarioContainer.addCharacter(scenarioId, {
        id: characterId,
        textColor: parseTextColor(req.body?.textColor),
      });

      res.json(updatedScenario);
    }),
  );

  // Import notes from another scenario
  router.post(
    `/:id/character/:characterId/import-notes`,
    requireAuth,
    asyncHandler(async (req, res) => {
      const characterId = parseId(req.params.characterId, 'characterId');
      const scenarioId = parseId(req.params.id);
      await assertOwnsCharacter(req, characterId);

      const notesIds = req.body?.notesIds ?? req.body?.notesId ?? [];
      const notes = await scenarioContainer.importNotes({
        notesIds: (Array.isArray(notesIds) ? notesIds : [notesIds]).map((id: unknown) =>
          parseId(id, 'note id'),
        ),
        scenarioId,
        authorId: characterId,
      });

      res.json(notes);
    }),
  );

  // Create a character note in scenario
  router.post(
    `/:id/character/:characterId/note`,
    requireAuth,
    asyncHandler(async (req, res) => {
      const scenarioId = parseId(req.params.id);
      const characterId = parseId(req.params.characterId, 'characterId');
      await assertOwnsCharacter(req, characterId);

      const fields = parseNoteFields(req.body ?? {}, { partial: false });
      const newNote = await scenarioContainer.createNote({
        title: fields.title as string,
        subtitle: fields.subtitle,
        description: fields.description,
        category: fields.category as NoteCategory,
        authorId: characterId,
        scenarioId,
      });

      const illustration = req.body?.illustration;
      if (!illustration) {
        res.json(newNote);
        return;
      }

      const illustrationFilename = await scenarioContainer.addIllustrationToNote({
        base64Image: illustration.base64Image,
        crop: illustration.crop,
        id: newNote.id,
      });

      res.json({ ...newNote, illustration: illustrationFilename });
    }),
  );

  // Edit a character note in scenario
  router.patch(
    `/:id/character/:characterId/note/:noteId`,
    requireAuth,
    asyncHandler(async (req, res) => {
      const scenarioId = parseId(req.params.id);
      const characterId = parseId(req.params.characterId, 'characterId');
      const noteId = parseId(req.params.noteId, 'noteId');
      await assertOwnsCharacter(req, characterId);

      const note = await scenarioContainer.getNote(noteId);
      if (!note || note.scenarioId !== scenarioId) throw createHttpError.NotFound('Note not found');
      if (note.authorId !== characterId) {
        throw createHttpError.Forbidden('You can only edit your own notes');
      }

      const updatedNote = await scenarioContainer.updateNote({
        ...parseNoteFields(req.body ?? {}, { partial: true }),
        id: noteId,
      } as Parameters<ScenarioContainer['updateNote']>[0]);

      const illustration = req.body?.illustration;
      if (!illustration) {
        res.json(updatedNote);
        return;
      }

      const illustrationFilename = await scenarioContainer.addIllustrationToNote({
        base64Image: illustration.base64Image,
        crop: illustration.crop,
        id: updatedNote.id,
      });

      res.json({ ...updatedNote, illustration: illustrationFilename });
    }),
  );

  // Get notes in scenario
  router.get(
    `/:id/note`,
    asyncHandler(async (req, res) => {
      res.json(await scenarioContainer.getNotes(parseId(req.params.id)));
    }),
  );

  // Post in scenario
  router.post(
    `/:id/post`,
    requireAuth,
    asyncHandler(async (req, res) => {
      const scenarioId = parseId(req.params.id);
      const characterId = parseId(req.body?.characterId, 'characterId');
      await assertOwnsCharacter(req, characterId);

      const newPost = await scenarioContainer.createPost({
        content: requireString(req.body?.content, 'content', MAX_POST_LENGTH),
        characterId,
        scenarioId,
        action: parseMoveIntent(req.body?.action),
      });

      const illustration = req.body?.illustration;
      if (!illustration) {
        res.json(newPost);
        return;
      }

      const illustrationFilename = await scenarioContainer.addIllustrationToPost({
        base64Image: illustration.base64Image,
        crop: illustration.crop,
        id: newPost.id,
      });

      res.json({ ...newPost, illustration: illustrationFilename });
    }),
  );

  // Edit a post in scenario
  router.put(
    `/:id/post/:postId`,
    requireAuth,
    asyncHandler(async (req, res) => {
      const scenarioId = parseId(req.params.id);
      const postId = parseId(req.params.postId, 'postId');

      const post = await scenarioContainer.getPost(postId);
      if (!post || post.scenarioId !== scenarioId) throw createHttpError.NotFound('Post not found');
      if (post.character.userId !== req.loggedUser!.id) {
        throw createHttpError.Forbidden('You can only edit your own posts');
      }

      const updatedPost = await scenarioContainer.updatePost({
        id: postId,
        content: requireString(req.body?.content, 'content', MAX_POST_LENGTH),
      });

      res.json(updatedPost);
    }),
  );

  return router;
}

export { scenarioRoutes };
