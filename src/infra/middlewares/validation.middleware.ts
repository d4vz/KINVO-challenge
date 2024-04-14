import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';

interface RequestValidators {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

const parseErrors = (errors: ZodIssue[]) => {
  if (errors.length === 0) {
    return {};
  }

  return errors.reduce((acc, error) => {
    const field = error.path.join('.');
    acc[field] = error.message;
    return acc;
  }, {});
};

export const validationMiddleware = (validators: RequestValidators) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }

      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }

      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = parseErrors(error.errors);
        return res.status(400).json({ errors });
      }

      next(error);
    }
  };
};
