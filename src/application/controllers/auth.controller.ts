import { MongoUsersRepository } from '@/infra/repositories/users/mongo-users-repository';
import { asyncHandler } from '@/utils/async-handler';
import { Service } from 'typedi';
import { SignInUseCase } from '../usecases/auth/sign-in.usecase';
import { SignUpUseCase } from '../usecases/auth/sign-up.usecase';

@Service()
export class AuthController {
  private signInUseCase = new SignInUseCase(new MongoUsersRepository());
  private signUpUseCase = new SignUpUseCase(new MongoUsersRepository());

  public signIn = asyncHandler(async (req, res) => {
    const data = req.body;
    const result = await this.signInUseCase.execute(data);
    return res.status(200).json(result);
  });

  public signUp = asyncHandler(async (req, res) => {
    const data = req.body;
    const result = await this.signUpUseCase.execute(data);
    return res.status(201).json(result);
  });
}
