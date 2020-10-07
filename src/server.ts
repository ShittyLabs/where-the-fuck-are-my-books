import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router
} from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { controllers } from './Controllers';
import { HttpError } from './Errors/HttpError';
import authentication from './Utilities/authentication';
import { Logger } from './Utilities/logger';

export class WhereTheFuckAreMyBooksServer {
  private _app: Express;
  constructor() {
    this._app = express();
  }

  private _setupAuthentication() {
    passport.use(authentication);
    this._app.use(passport.authenticate('local'));
  }

  private _setupMiddleware() {
    this._app.use(express.json());
  }

  private _setupLogging() {
    this._app.use(morgan('combined'));
  }

  private _setupRoutes() {
    const api = Router();
    controllers.forEach(({ path, router }) => {
      api.use(path, router);
    });
    this._app.use('/api', api);
    this._app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof HttpError) {
          return res.status(error.statusCode).send(error.message);
        }
        return res.status(500).json(error.message);
      }
    );
  }

  public start(): void {
    this._setupLogging();
    this._setupMiddleware();
    this._setupRoutes();
    this._app.listen(3000, () => {
      Logger.info('Listening on 3000');
    });
  }
}
