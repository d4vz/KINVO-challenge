import { SignUpDto } from '@/application/dtos/auth.dto';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { HttpException } from '@/infra/exceptions/httpException';
import { hash } from 'bcrypt';
import _ from 'lodash';

export class SignUpUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: SignUpDto) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new HttpException(409, `User with email ${data.email} already exists`);
    }

    const hashedPassword = await hash(data.password, 10);

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return _.omit(user, ['password']);
  }
}
