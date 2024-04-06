import bcrypt from 'bcryptjs';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

import { CreateUserDto, User } from '../app/user/domain/user/entities/user';

function signAccessToken(payload: User) {
  return new Promise((resolve, reject) => {
    jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
      if (err) {
        reject(createHttpError.InternalServerError());
      }
      resolve(token);
    });
  });
}

export class AuthService {
  async hashUser(user: CreateUserDto) {
    return { ...user, password: bcrypt.hashSync(user.password, 8) };
  }

  async giveAccessToken(user: User) {
    const accessToken = await signAccessToken(user);
    return { ...user, accessToken };
  }

  async loginUser(password: string, hashedUser: User) {
    const checkPassword = bcrypt.compareSync(password, hashedUser.password);
    if (!checkPassword) throw createHttpError.Unauthorized('Email address or password not valid');
    const accessToken = await signAccessToken(hashedUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = hashedUser;
    return { ...user, accessToken };
  }

  async getUserByAccessToken(accessToken: string): Promise<User> {
    return new Promise((resolve, reject) => {
      jwt.verify(accessToken, accessTokenSecret, (err, decoded) => {
        if (err) {
          reject(createHttpError.Unauthorized());
        }

        if (decoded && typeof decoded !== 'string') {
          resolve(decoded.payload as User);
        }
      });
    });
  }
}
