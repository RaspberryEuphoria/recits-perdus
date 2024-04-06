import { User } from '../../app/user/domain/user/entities/user';

export {};

declare global {
  namespace Express {
    export interface Request {
      loggedUser?: User;
    }
  }
}
