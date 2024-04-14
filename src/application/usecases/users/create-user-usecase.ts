import { CreateUserDto } from '@/application/dtos/users.dto';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { HttpException } from '@/infra/exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  public async execute(userData: CreateUserDto) {
    const existentUser = await this.userRepository.findByEmail(userData.email);

    if (existentUser) {
      throw new HttpException(409, `User with email ${userData.email} already exists`);
    }

    const user = await this.userRepository.create(userData);

    if (!user) {
      throw new HttpException(500, 'Internal Error While Creating User');
    }

    return user;
  }
}
