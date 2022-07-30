import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller';

export const authRouter = Router();

authRouter
	.post('/login', AuthController.login)
	.get('/logout', AuthController.logout);
