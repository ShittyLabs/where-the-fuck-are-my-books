import { Strategy as LocalStrategy } from 'passport-local';
import { UserManager } from '../Managers/UserManager';
const users = new UserManager();

export default new LocalStrategy(async function authentication(
  username,
  password,
  done
) {
  const user = await users.login(username, password);
  return done(null, user);
});
