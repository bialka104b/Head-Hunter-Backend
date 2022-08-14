import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth/auth.controller';

export const authRouter = Router();

authRouter
	.post('/login', AuthController.login)
	.post('/forgotPassword', AuthController.forgotPassword)
	.get('/logout', passport.authenticate('jwt', { session: false }), AuthController.logout)
	.post('/changePassword', passport.authenticate('jwt', { session: false }), AuthController.changePassword);

