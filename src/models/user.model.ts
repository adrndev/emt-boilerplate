import { Schema, model, Document, Types } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  pictureUrl: String;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [isEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password is too short']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pictureUrl: {
    type: String
  }
});

const User = model<IUser>('User', UserSchema);

export default User;
