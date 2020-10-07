import { IController } from './IController';
import { ProfileController } from './ProfileController';
import { UserController } from './UserController';

export const controllers: Array<IController> = [
  new UserController(),
  new ProfileController()
];
