import { ProfileSchema } from './ProfileSchema';
import { UserSchema } from './UserSchema';

export const Schema: { [key: string]: any } = {
  user: UserSchema,
  profile: ProfileSchema
};
