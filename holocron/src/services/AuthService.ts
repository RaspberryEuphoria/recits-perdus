import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { CreateUserDto, User } from '../app/user/domain/user/entities/user';

const ACCESS_TOKEN_TTL = '30d';
const BCRYPT_COST = 10;

/** Fields safe to embed in the token and to send back to the client */
export type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

function getSecret() {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) throw new Error('ACCESS_TOKEN_SECRET is not set');
  return secret;
}

export function toPublicUser(user: User | PublicUser): PublicUser {
  return { id: user.id, name: user.name, email: user.email };
}

function signAccessToken(user: PublicUser): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { payload: toPublicUser(user) },
      getSecret(),
      { expiresIn: ACCESS_TOKEN_TTL },
      (err, token) => {
        if (err || !token) {
          reject(createHttpError.InternalServerError());
          return;
        }
        resolve(token);
      },
    );
  });
}

export class AuthService {
  async hashUser(user: CreateUserDto) {
    return { ...user, password: await bcrypt.hash(user.password, BCRYPT_COST) };
  }

  async giveAccessToken(user: User | PublicUser) {
    const accessToken = await signAccessToken(user);
    return { ...toPublicUser(user), accessToken };
  }

  async loginUser(password: string, hashedUser: User) {
    const checkPassword = await bcrypt.compare(password, hashedUser.password);
    if (!checkPassword) throw createHttpError.Unauthorized('Email address or password not valid');
    return this.giveAccessToken(hashedUser);
  }

  /**
   * Resolves the user embedded in a valid token, or null if the token is invalid/expired.
   */
  async getUserByAccessToken(accessToken: string): Promise<PublicUser | null> {
    return new Promise((resolve) => {
      jwt.verify(accessToken, getSecret(), (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string' || !decoded.payload?.id) {
          resolve(null);
          return;
        }
        resolve(toPublicUser(decoded.payload as PublicUser));
      });
    });
  }
}
