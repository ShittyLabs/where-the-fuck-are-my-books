import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Wraps a `RequestHandler` invocation in a try-catch block
 * to safely pass errors to the next handler in the middleware chain.
 * @param handler The middleware to wrap.
 */
export function dontDie(handler: RequestHandler): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
      return result;
    } catch (err) {
      next(err);
    }
  };
}
