import { MongoUsersRepository } from '@/infra/repositories/users/mongo-users-repository';
import { asyncHandler } from '@/utils/async-handler';
import { CreateUserUseCase } from '../usecases/users/create-user-usecase';

export class UserController {
  private createUserUseCase = new CreateUserUseCase(new MongoUsersRepository());

  public createUser = asyncHandler(async (req, res) => {
    const user = await this.createUserUseCase.execute(req.body);
    res.status(201).json({ data: user, message: 'User Created' });
  });
}
