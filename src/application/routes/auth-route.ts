import { validationMiddleware } from '@/infra/middlewares/validation.middleware';
import { Router } from 'express';
import Container from 'typedi';
import { AuthController } from '../controllers/auth.controller';
import { signInSchema, signUpSchema } from '../dtos/auth.dto';
import { Routes } from '../interfaces/routes.interface';

export class AuthRoute implements Routes {
  private controller = Container.get(AuthController);

  router = Router();
  path = '/auth';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/sign-in`,
      validationMiddleware({
        body: signInSchema,
      }),
      this.controller.signIn,
    );
    this.router.post(
      `${this.path}/sign-up`,
      validationMiddleware({
        body: signUpSchema,
      }),
      this.controller.signUp,
    );
  }
}
