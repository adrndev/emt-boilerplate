import { Response, NextFunction } from 'express';
import { IRequestWithUser } from '../types';
import { Types } from 'mongoose';
import { AccessDeniedError, BadRequestError } from '../errors';
import { Role } from '../models/user.model';

const isAdmin = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  try {
    // Check if user exist
    if (!req.user) {
      throw new AccessDeniedError();
    }

    // Check if user has admin role
    if (req.user.role !== Role.ADMIN) {
      throw new AccessDeniedError('Only admin can request this resource.');
    }

    // Check if provided _id is valid
    if (!Types.ObjectId.isValid(req.user._id)) {
      throw new BadRequestError('Provided ObjectId is not valid.');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isAdmin;
