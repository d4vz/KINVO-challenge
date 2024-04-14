import { User } from '@/domain/entities/user.entity';
import { UsersRepository } from '@/domain/repositories/users.repository';

export class FindUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
