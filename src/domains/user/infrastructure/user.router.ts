import { UserController } from '../controllers/userController';
import { Router } from 'express';

import {
  createUniqueCheckMiddleware,
  createExistCheckMiddleware,
} from '../../../utils/check';
const userController = new UserController();
const router = Router();
const checkCreateUserUnique = createUniqueCheckMiddleware('user', [
  'username',
  'email',
]);
const checkEditUserUnique = createUniqueCheckMiddleware('user', [
  'username',
  'email',
]);
router.post('/new', userController.handleCreateUser);
router.post('/edit/:userId', userController.handleEditUser);
router.get('/:email', userController.handleGetUserByEmail);
export default router;
