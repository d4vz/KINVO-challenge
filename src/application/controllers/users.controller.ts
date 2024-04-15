import { MongoUsersRepository } from '@/infra/repositories/mongo/mongo-users-repository';
import { asyncHandler } from '@/utils/async-handler';
import { CreateUserUseCase } from '../usecases/users/create-user-usecase';
import { DeleteUserByIdUseCase } from '../usecases/users/delete-user-by-id.usecase';
import { FindUserByIdUseCase } from '../usecases/users/find-user-by-id.usecase';
import { FindUsersUseCase } from '../usecases/users/find-users.usecase';
import { UpdateUserByIdUseCase } from '../usecases/users/update-user-by-id.usecase';

const usersRepository = new MongoUsersRepository();

export class UserController {
  private createUserUseCase = new CreateUserUseCase(usersRepository);
  private findUsersUseCase = new FindUsersUseCase(usersRepository);
  private findUserByIdUseCase = new FindUserByIdUseCase(usersRepository);
  private deleteUserByIdUseCase = new DeleteUserByIdUseCase(usersRepository);
  private updateUserByIdUseCase = new UpdateUserByIdUseCase(usersRepository);

  public createUser = asyncHandler(async (req, res) => {
    const user = await this.createUserUseCase.execute(req.body);
    res.status(201).json({ data: user, message: 'User Created' });
  });

  public findUsers = asyncHandler(async (req, res) => {
    const users = await this.findUsersUseCase.execute();
    res.status(200).json(users);
  });

  public findUserById = asyncHandler(async (req, res) => {
    const user = await this.findUserByIdUseCase.execute(req.params.id);
    res.status(200).json(user);
  });

  public deleteUserById = asyncHandler(async (req, res) => {
    await this.deleteUserByIdUseCase.execute(req.params.id);
    res.status(200).json({ message: 'User Deleted' });
  });

  public updateUserById = asyncHandler(async (req, res) => {
    const user = await this.updateUserByIdUseCase.execute(req.params.id, req.body);
    res.status(200).json({ data: user, message: 'User Updated' });
  });
}
