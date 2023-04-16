import User, { IUser } from '../models/user.model';
import { compare } from 'bcryptjs';

class UserService {
  private userModel = User;

  public async createUser(userData: IUser): Promise<IUser> {
    const user = new this.userModel(userData);
    return user.save();
  }

  public async authenticateUser(
    email: string,
    password: string
  ): Promise<IUser | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }
    return user;
  }

  public async getUser(userId: string): Promise<IUser | null> {
    return this.userModel
      .findById(userId)
      .select('name email createdAt pictureUrl');
  }

  public async getAllUsers(): Promise<IUser[]> {
    return this.userModel
      .find()
      .select('name email createdAt pictureUrl')
      .exec();
  }

  public async updateUser(userId: string, userData: IUser): Promise<IUser> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, userData);
    return user.save();
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default new UserService();
