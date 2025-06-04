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
router.post('/new', handleCreateUser);
router.post('/edit/:userId', handleEditUser);
router.get('/:email', handleGetUserByEmail);
export default router;
