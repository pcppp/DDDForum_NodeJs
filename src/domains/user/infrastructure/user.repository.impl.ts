import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {
  async existsByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { email } });
    return !!user;
  }

  async existsByUsername(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { username } });
    return !!user;
  }

  async save(user: User): Promise<User> {
    const res = await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        ...(user.firstName && { firstName: user.firstName }),
        ...(user.lastName && { lastName: user.lastName }),
      },
    });
    return res;
  }
}
