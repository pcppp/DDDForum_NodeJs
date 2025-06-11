import { User } from './user.entity';

export interface IUserRepository {
  existsByEmail(email: string): Promise<boolean>;
  existsByUsername(username: string): Promise<boolean>;
  save(user: User): Promise<User>;
}
