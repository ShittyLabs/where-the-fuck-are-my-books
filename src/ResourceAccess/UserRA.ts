import { ObjectId } from 'mongodb';
import { db } from '../Factories/MongoDBFactory';
import { IUser, User } from '../Models/User';

export class UserRA {
  public async create(user: User): Promise<boolean> {
    const result = await db()
      .collection<IUser>('users')
      .insertOne(user.toMongo());
    return result.insertedCount === 1;
  }
  public async getById(id: string): Promise<IUser | null> {
    const result = await db()
      .collection<IUser>('users')
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $lookup: {
            from: 'profiles',
            localField: '_id',
            foreignField: 'userId',
            as: 'profile'
          }
        },
        {
          $set: {
            profile: { $first: '$profile' }
          }
        }
      ])
      .toArray();

    return result[0];
  }
  public async getByEmail(email: string): Promise<IUser | null> {
    return db().collection('users').findOne({ email });
  }
}
