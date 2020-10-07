import { ObjectId } from 'mongodb';

export interface IProfile {
  _id: ObjectId;
  userId: ObjectId;
  birthday: Date;
}
