import { PublicUser } from '../../services/AuthService';

export {};

declare global {
  namespace Express {
    export interface Request {
      loggedUser?: PublicUser;
    }
  }
}
