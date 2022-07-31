import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth/auth.controller';

export const authRouter = Router();

authRouter
	.post('/login', AuthController.login)
	.get('/logout', passport.authenticate('jwt', { session: false }), AuthController.logout);
