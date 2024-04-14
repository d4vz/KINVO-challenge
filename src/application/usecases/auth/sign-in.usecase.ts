import { SignInDto } from '@/application/dtos/auth.dto';
import { JwtPayload } from '@/application/interfaces/jwt-payload.interface';
import { User } from '@/domain/entities/user.entity';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { config } from '@/infra/config';
import { HttpException } from '@/infra/exceptions/httpException';
import { sign } from 'jsonwebtoken';

const createToken = (user: User) => {
  const dataStoredInToken: JwtPayload = { _id: user._id, email: user.email, name: user.name };
  const expiresIn: number = 60 * 60; // 1 hour
  return sign(dataStoredInToken, config.SECRET_KEY, { expiresIn });
};

export class SignInUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: SignInDto) {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    const isPasswordMatching = await user.comparePassword(data.password);

    if (!isPasswordMatching) {
      throw new HttpException(401, 'Password or email is incorrect');
    }

    const tokenData = createToken(user);

    return { token: tokenData };
  }
}
