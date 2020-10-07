import { RequestHandler, Router } from 'express';
import { ProfileManager } from '../Managers/ProfileManager';
import { dontDie } from '../Utilities/dontDie';
import Validator from '../Validation/Validator';
import { IController } from './IController';

export interface IProfileCreatePayload {
  userId: string;
  birthday: string;
}

export class ProfileController implements IController {
  path: string = '/profiles';
  router: Router = Router();
  private userManager: ProfileManager = new ProfileManager();

  constructor() {
    this.router.post('/', dontDie(this.create));
  }

  public create: RequestHandler = async (req, res) => {
    const user = Validator.validate<IProfileCreatePayload>(
      req.body,
      'profile.create'
    );
    const success = await this.userManager.create(user);

    return res.send({ success });
  };
}
