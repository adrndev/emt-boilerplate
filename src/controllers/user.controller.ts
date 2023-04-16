import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import { genSalt, hash } from 'bcryptjs';
import userService from '../services/user-service';
import { sign, Secret } from 'jsonwebtoken';

const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

export default {
  getAll: async (req: Request, res: Response): Promise<void> => {
    const users = await userService.getAllUsers();

    res.send(users);
  },

  get: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await userService.getUser(id);

    res.send(user);
  },

  create: async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, confirmPassword, pictureUrl } = req.body;

    console.log(password, confirmPassword);

    User.schema.path('name').validate(async (value) => {
      return !(await User.countDocuments({ name: value }));
    }, 'Name already in use');

    User.schema.path('email').validate(async (value) => {
      return !(await User.countDocuments({ email: value }));
    }, 'Email already in use');

    User.schema.path('password').validate(async () => {
      return password === confirmPassword;
    }, "Passwords doesn't match");

    const salt = await genSalt(10);

    try {
      const userData = {
        name,
        email,
        pictureUrl,
        password: await hash(password, salt),
      } as IUser;
      const newUser = await userService.createUser(userData);

      res.send(newUser);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  auth: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);

    if (!user) {
      res.status(500).send({ message: 'Incorrect email or password' });
    } else {
      const token = sign({ _id: user._id }, SECRET_KEY);

      res
        .header('x-auth-token', token)
        .send({
          name: user.name,
          pictureUrl: user.pictureUrl,
        });
    }
  },
};
