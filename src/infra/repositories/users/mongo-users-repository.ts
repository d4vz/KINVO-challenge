import { CreateUserDto, UpdateUserDto } from '@/application/dtos/users.dto';
import { User } from '@/domain/entities/user.entity';
import { UsersRepository } from '@/domain/repositories/users.repository';
import { UserModel } from '@/infra/models/users.model';
import { Service } from 'typedi';

@Service()
export class MongoUsersRepository implements UsersRepository {
  public async find(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map(user => user && new User(user.toObject()));
  }

  public async findOne(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    if (!user) return null;
    return new User(user.toObject());
  }

  public async create(userData: CreateUserDto): Promise<User | null> {
    const user = await UserModel.create(userData);
    if (!user) return null;
    return new User(user.toObject());
  }

  public async update(id: string, userData: UpdateUserDto): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(id, userData, { new: true });
    if (!user) return null;
    return new User(user.toObject());
  }

  public async delete(id: string): Promise<boolean> {
    const user = await UserModel.findByIdAndDelete(id);
    return !!user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return new User(user.toObject());
  }
}
