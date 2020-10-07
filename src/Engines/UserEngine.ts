import { ObjectId } from 'mongodb';
import { IUser } from '../Models/User';
import bcrypt from 'bcrypt';
import { IUserCreatePayload } from '../Controllers/UserController';

export class UserEngine {
  async initializeUser(user: IUserCreatePayload): Promise<IUser> {
    return {
      _id: new ObjectId(),
      ...user,
      password: await this._hashpassword(user.password)
    };
  }

  doesPasswordMatch(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private async _hashpassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }
}
