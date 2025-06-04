import { Router } from 'express';
import {
  handleCreateUser,
  handleEditUser,
  handleGetUserByEmail,
} from '../controllers/userController';
import {
  createUniqueCheckMiddleware,
  createExistCheckMiddleware,
} from '../utils/check';

const router = Router();
const checkCreateUserUnique = createUniqueCheckMiddleware('user', [
  'username',
  'email',
]);
const checkEditUserUnique = createUniqueCheckMiddleware('user', [
  'username',
  'email',
]);
router.post('/new', checkCreateUserUnique as any, handleCreateUser);
router.post('/edit/:userId', checkEditUserUnique as any, handleEditUser);
router.post('/edit/:email', handleGetUserByEmail);
export default router;
