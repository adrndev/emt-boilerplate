import { Response, NextFunction } from 'express';
import { IRequestWithUser } from '../types';
import { Secret, verify } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

const verifyJwt = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['x-auth-token'] as string;

    // Check if token is provided
    if (!token) {
      throw new UnauthorizedError();
    }

    // Verify provided token
    verify(token, SECRET_KEY, (err: any, user: any) => {
      if (err) throw new UnauthorizedError();
      req.user = user;

      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyJwt;
