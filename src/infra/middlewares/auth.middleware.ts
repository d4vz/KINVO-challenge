import { JwtPayload } from '@/application/interfaces/jwt-payload.interface';
import { UserRequest } from '@/application/interfaces/user-request.interface';
import { HttpException } from '@/infra/exceptions/httpException';

import { config } from '@/infra/config';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import _ from 'lodash';
import { MongoUsersRepository } from '../repositories/users/mongo-users-repository';

const getAuthorization = req => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = getAuthorization(req);

    if (!authorization) {
      next(new HttpException(401, 'Authentication token missing'));
      return;
    }

    const payload = verify(authorization, config.SECRET_KEY) as JwtPayload;
    const usersRepository = new MongoUsersRepository();
    const currentUser = await usersRepository.findOne(payload._id);

    if (!currentUser) {
      next(new HttpException(401, 'Wrong authentication token'));
      return;
    }

    req.user = _.pick(currentUser, ['_id', 'email', 'name']);
    next();
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
