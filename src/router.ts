import { Router } from 'express';
import { controllers } from './Controllers';

export const APIRouter = Router();

controllers.forEach(({ path, router }) => {
  APIRouter.use(path, router);
});
