import { compare } from 'bcrypt';

export class User {
  _id: string;
  name: string;
  email: string;
  password: string;

  constructor(props: User) {
    Object.assign(this, props);
  }

  public async comparePassword(password: string) {
    const isMatch = await compare(password, this.password);
    return isMatch;
  }
}
