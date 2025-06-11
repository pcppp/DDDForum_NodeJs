import { PrismaClient } from '@prisma/client';
import { hashPassword, generateRandomPassword } from '../../../utils/password';

// ******************************** 基础设施层(负责数据库的调用) ***********************************
const prisma = new PrismaClient();

export async function createUser(data: {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}) {
  const rawPassword = generateRandomPassword();
  const hashedPassword = await hashPassword(rawPassword);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  console.log(`✅ 创建用户成功，初始密码为：${rawPassword}`);

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export async function editUser(
  userId: string,
  data: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  }
) {
  const user = await prisma.user.update({
    where: { id: parseInt(userId, 10) },
    data: { ...data },
  });

  console.log(`✅ 修改用户成功`);

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return { ...user };
}

export async function isUserIdTaken(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId, 10) },
  });
  return Boolean(user);
}
export async function isEmailUnique(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return Boolean(user);
}
export async function isUsernameUnique(username: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { username },
  });
  return Boolean(user);
}
