import { Response, NextFunction } from 'express';
import { IRequestWithUser } from '../types';
import { Types } from 'mongoose';
import { AccessDeniedError, BadRequestError } from '../errors';

const isOwner = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  try {
    // Check if user exist
    if (!req.user) {
      throw new AccessDeniedError();
    }

    // Check if user is the requested resource
    if (
      req.baseUrl + req.route.path === '/api/users/:id' &&
      req.user._id !== req.params.id
    ) {
      throw new AccessDeniedError();
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

export default isOwner;
