import { UsersRepository } from '@/domain/repositories/users.repository';
import { HttpException } from '@/infra/exceptions/httpException';

export class DeleteUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    return this.usersRepository.delete(id);
  }
}
