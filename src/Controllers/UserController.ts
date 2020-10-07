import { Request, RequestHandler, Response, Router } from 'express';
import { HttpStatus } from '../Constant/HttpStatus';
import { UserManager } from '../Managers/UserManager';
import { dontDie } from '../Utilities/dontDie';
import Validator from '../Validation/Validator';
import { IController } from './IController';

export interface IUserCreatePayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserController implements IController {
  path: string = '/users';
  router: Router = Router();
  private userManager: UserManager = new UserManager();

  constructor() {
    this.router.get('/:id', dontDie(this.getById));
    this.router.post('/', dontDie(this.create));
  }

  public create: RequestHandler = async (req, res) => {
    const user = Validator.validate<IUserCreatePayload>(
      req.body,
      'user.create'
    );
    const success = await this.userManager.create(user);

    return res.send({ success });
  };

  public getById: RequestHandler = async (req: Request, res: Response) => {
    const user = await this.userManager.getById(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(HttpStatus.NotFound);
    }
  };
}
