import _ from 'lodash';

import { IUserCreatePayload } from '../Controllers/UserController';
import { UserEngine } from '../Engines/UserEngine';
import { ConflictError } from '../Errors/ConflictError';
import { UnauthorizedError } from '../Errors/UnauthorizedError';
import { IUser, User } from '../Models/User';
import { UserRA } from '../ResourceAccess/UserRA';

export class UserManager {
  private _userRA: UserRA;
  private _userEngine: UserEngine;
  constructor() {
    this._userRA = new UserRA();
    this._userEngine = new UserEngine();
  }

  async create(user: IUserCreatePayload) {
    const existingUser = await this._userRA.getByEmail(user.email);
    if (existingUser) throw new ConflictError('User already exists');

    const newUser = new User(user);
    newUser.hashPassword();
    return this._userRA.create(newUser);
  }

  getById(id: string): Promise<IUser | null> {
    return this._userRA.getById(id);
  }

  async login(
    username: string,
    password: string
  ): Promise<Omit<IUser, 'password'>> {
    const user = await this._userRA.getByEmail(username);
    if (!user) throw new UnauthorizedError('Login invalid');
    const valid = await this._userEngine.doesPasswordMatch(
      password,
      user.password
    );
    if (!valid) throw new UnauthorizedError('Login invalid');
    return _.omit(user, 'password');
  }
}
