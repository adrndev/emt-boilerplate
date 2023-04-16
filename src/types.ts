import { Request } from 'express';
import { IUser } from './models/user.model';

export interface IRequestWithUser extends Request {
  user?: IUser;
}