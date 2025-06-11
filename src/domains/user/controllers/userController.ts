import { Request, Response } from 'express';
import {
  createUser,
  editUser,
  isUserIdTaken,
  getUserByEmail,
  isEmailUnique,
  isUsernameUnique,
} from '../services/userService';
import { BaseController } from './baseController';
import { PrismaUserRepository } from '../infrastructure/user.repository.impl';
import { CreateUserUseCase } from '../application/create-user.usercase';
import { BaseError } from '../../../shared/BaseError';
const repo = new PrismaUserRepository();
const useCase = new CreateUserUseCase(repo);
// ******************************** 逻辑控制层(负责调用底层逻辑) ***********************************
export class UserController extends BaseController {
  async handleCreateUser(req: Request, res: Response) {
    try {
      const user = await useCase.execute(req.body);
      res
        .status(201)
        .json({ message: '用户创建成功', data: user, success: true });
    } catch (err) {
      if (err instanceof BaseError) {
        res.status(err.statusCode).json({ error: err.message });
      }
      // fallback for unexpected error
      res.status(500).json({ error: '服务器内部错误' });
    }
  }

  async handleEditUser(req: Request, res: Response) {
    try {
      const { email, username, firstName, lastName } = req.body;
      if (
        !((await isEmailUnique(email)) && (await isUsernameUnique(username)))
      ) {
        res.status(509).json({
          error: '邮箱或用户名已被使用',
          data: undefined,
          success: false,
        });
      }
      const userId = req.params.userId;
      if (!(await isUserIdTaken(userId))) {
        res.status(404).json({
          error: '用户不存在',
          data: undefined,
          success: false,
        });
      }
      const user = await editUser(userId as string, {
        email,
        username,
        firstName,
        lastName,
      });
      res.status(200).json({
        error: undefined,
        data: { ...user },
        success: true,
      });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({
        error: '服务器错误',
        data: undefined,
        success: false,
      });
    }
  }
  async handleGetUserByEmail(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const user = await getUserByEmail(email);
      if (!user || !user.id) {
        res.status(404).json({
          error: '用户不存在',
          data: undefined,
          success: false,
        });
      } else {
        res.status(200).json({
          error: undefined,
          data: { ...user },
          success: true,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        error: '服务器错误',
        data: undefined,
        success: false,
      });
    }
  }
}
