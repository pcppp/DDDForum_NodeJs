import { Request, Response } from 'express';
import {
  createUser,
  editUser,
  isUserIdTaken,
  getUserByEmail,
} from '../services/userService';

export async function handleCreateUser(req: Request, res: Response) {
  try {
    const { email, username, firstName, lastName } = req.body;
    const user = await createUser({ email, username, firstName, lastName });
    res.status(201).json({
      error: undefined,
      data: { ...user },
      success: false,
    });
  } catch (err: any) {
    res.status(500).json({
      error: '服务器错误',
      data: undefined,
      success: true,
    });
  }
}
export async function handleEditUser(req: Request, res: Response) {
  try {
    const { email, username, firstName, lastName } = req.body;
    const userId = req.params.userId as unknown;
    if (!isUserIdTaken(userId as number)) {
      res.status(404).json({
        error: undefined,
        data: undefined,
        success: false,
      });
    }
    const user = await editUser(userId as number, {
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
export async function handleGetUserByEmail(req: Request, res: Response) {
  try {
    const email = req.params.email;
    const user = await getUserByEmail(email);
    if (!user || !user.userId) {
      res.status(404).json({
        error: undefined,
        data: undefined,
        success: false,
      });
    }
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
