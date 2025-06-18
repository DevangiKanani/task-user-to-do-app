import express from 'express';
import { validate } from 'express-validation';
import { register, login } from '../controllers/auth';
import { userRegister } from '../validators/user';

const router = express.Router();

router.post('/register', validate(userRegister), register);
router.post('/login', login);

export default router;
