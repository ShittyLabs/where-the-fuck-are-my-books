import _ from 'lodash';
import { ObjectId } from 'mongodb';
import { IProfileCreatePayload } from '../Controllers/ProfileController';

import { ConflictError } from '../Errors/ConflictError';
import { IProfile } from '../Models/User';
import { ProfileRA } from '../ResourceAccess/ProfileRA';

export class ProfileManager {
  private _profileRA: ProfileRA;
  constructor() {
    this._profileRA = new ProfileRA();
  }

  async create(profile: IProfileCreatePayload) {
    const profileExists = await this._profileRA.existsByUserID(profile.userId);
    if (profileExists) throw new ConflictError('Profile already exists');

    const newProfile: IProfile = {
      _id: new ObjectId(),
      userId: new ObjectId(profile.userId),
      birthday: new Date(profile.birthday)
    };
    return this._profileRA.create(newProfile);
  }
}
