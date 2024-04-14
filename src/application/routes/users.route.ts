import { UserController } from '@/application/controllers/users.controller';
import { createUserDto, updateUserDto } from '@/application/dtos/users.dto';

import { authMiddleware } from '@/infra/middlewares/auth.middleware';
import { validationMiddleware } from '@/infra/middlewares/validation.middleware';
import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';

export class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    this.router.post(
      this.path,
      validationMiddleware({
        body: createUserDto,
      }),
      this.controller.createUser,
    );
    this.router.get(this.path, this.controller.findUsers);
    this.router.get(`${this.path}/:id`, this.controller.findUserById);
    this.router.delete(`${this.path}/:id`, this.controller.deleteUserById);
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware({
        body: updateUserDto,
      }),
      this.controller.updateUserById,
    );
  }
}
