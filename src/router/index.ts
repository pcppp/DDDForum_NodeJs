import { Router } from 'express';
import userRouter from '../domains/user/infrastructure/user.router';

const router = Router();

router.use('/users', userRouter);

export default router;
