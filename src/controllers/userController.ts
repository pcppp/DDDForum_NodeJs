import { Request, Response } from 'express';
import {
  createUser,
  editUser,
  isUserIdTaken,
  getUserByEmail,
  isEmailUnique,
  isUsernameUnique,
} from '../services/userService';

export async function handleCreateUser(req: Request, res: Response) {
  try {
    const { email, username, firstName, lastName } = req.body;
    const user = await createUser({ email, username, firstName, lastName });
    if (!((await isEmailUnique(email)) && (await isUsernameUnique(username)))) {
      res.status(509).json({
        error: undefined,
        data: undefined,
        success: false,
      });
    }
    res.status(201).json({
      error: undefined,
      data: { ...user },
      success: true,
    });
  } catch (err: any) {
    console.log('err', err);

    res.status(500).json({
      error: '服务器错误',
      data: undefined,
      success: false,
    });
  }
}
export async function handleEditUser(req: Request, res: Response) {
  try {
    const { email, username, firstName, lastName } = req.body;
    if (!((await isEmailUnique(email)) && (await isUsernameUnique(username)))) {
      res.status(509).json({
        error: undefined,
        data: undefined,
        success: false,
      });
    }
    const userId = req.params.userId;
    if (!(await isUserIdTaken(userId))) {
      res.status(404).json({
        error: undefined,
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
