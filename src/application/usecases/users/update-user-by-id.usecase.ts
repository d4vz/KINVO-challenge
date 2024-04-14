import { UpdateUserDto } from '@/application/dtos/users.dto';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { HttpException } from '@/infra/exceptions/httpException';

export class UpdateUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute(id: string, userData: UpdateUserDto) {
    const user = await this.usersRepository.update(id, userData);

    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    return user;
  }
}
