import bcrypt from 'bcryptjs';
import { IUserRepository } from '../domain/user.repository';
import { CreateUserDTO } from '../domain/user.type';
import { User } from '../domain/user.entity';
import {
  UserAlreadyExistsError,
  InvalidEmailError,
} from '../../../shared/UserError';
import { generateRandomPassword, hashPassword } from '../../../utils/password';
export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const emailExists = await this.userRepo.existsByEmail(dto.email);
    if (emailExists) throw new InvalidEmailError();

    const usernameExists = await this.userRepo.existsByUsername(dto.username);
    if (usernameExists) throw new UserAlreadyExistsError();

    const hashedPassword = await hashPassword(generateRandomPassword());

    const user = User.create({
      id: null,
      email: dto.email,
      username: dto.username,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    const res = await this.userRepo.save(user);
    return res;
  }
}
