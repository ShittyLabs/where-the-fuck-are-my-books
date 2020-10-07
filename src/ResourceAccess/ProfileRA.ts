import { ObjectId } from 'mongodb';
import { db } from '../Factories/MongoDBFactory';
import { IProfile } from '../Models/Profile';

export class ProfileRA {
  public async create(profile: IProfile): Promise<boolean> {
    const result = await db().collection('profiles').insertOne(profile);
    return result.insertedCount === 1;
  }

  public async existsByUserID(userId: string) {
    const query = { userId: new ObjectId(userId) };
    const result = await db().collection('profiles').countDocuments(query);
    return result !== 0;
  }
}
