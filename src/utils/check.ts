import { PrismaClient, Prisma } from '@prisma/client';
import e, { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();
// 显式声明：模型名到 whereUnique 类型的映射
type ModelWhereUniqueMap = {
  user: Prisma.UserWhereUniqueInput;
};
/**
 * 生成一个通用的唯一性检查中间件
 * @param modelName - Prisma 模型名（如 "user"、"post"）
 * @param fields - 要检查唯一性的字段名数组
 */
export function createUniqueCheckMiddleware<
  T extends keyof ModelWhereUniqueMap,
  K extends keyof ModelWhereUniqueMap[T]
>(modelName: T, fields: K[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const where: any = {};

    for (const field of fields) {
      const value = req.body[field as string];
      if (!value) {
        return res.status(400).json({ error: `字段 ${String(field)} 缺失` });
      }
      where[field] = value;

      // 检查唯一性
      const existing = await (prisma[modelName] as any).findUnique({
        where: { [field]: value },
      });

      if (existing) {
        return res.status(409).json({
          error: `字段 ${String(field)} 已存在`,
          conflictField: field,
        });
      }
    }

    next();
  };
}
export function createExistCheckMiddleware<
  T extends keyof ModelWhereUniqueMap,
  K extends keyof ModelWhereUniqueMap[T]
>(modelName: T, fields: K[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const where: any = {};

    for (const field of fields) {
      const value = req.body[field as string];
      if (!value) {
        return res.status(400).json({ error: `字段 ${String(field)} 缺失` });
      }
      where[field] = value;

      // 检查唯一性
      const existing = await (prisma[modelName] as any).findUnique({
        where: { [field]: value },
      });

      if (existing) {
        next();
      } else {
        return res
          .status(404)
          .json({ error: '未找到', data: undefined, success: false });
      }
    }
  };
}
