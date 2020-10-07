import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

import { IUserCreatePayload } from '../Controllers/UserController';

export class User {
  _id!: ObjectId;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;

  constructor(user: IUserCreatePayload | IUser) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this._id = '_id' in user ? user._id : new ObjectId();
  }

  toMongo(): IUser {
    return {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.lastName
    };
  }

  toResponse() {
    return {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    };
  }

  hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(this.password, salt);
    this.password = passwordHash;
  }
}

export interface IUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
