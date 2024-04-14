import { CreateUserDto, UpdateUserDto } from '@/application/dtos/users.dto';
import { User } from '../entities/user.entity';

export interface UsersRepository {
  find(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  create(data: CreateUserDto): Promise<User | null>;
  update(id: string, data: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}
