import { CreateUserDto } from '@/application/dtos/users.dto';
import { User } from '@/domain/entities/user.entity';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { Service } from 'typedi';

@Service()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}

  public async execute(userData: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(userData);
    return user;
  }
}
