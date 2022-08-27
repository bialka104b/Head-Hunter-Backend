import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth/auth.controller';

export const authRouter = Router();

authRouter
	.post(
		'/login',
		AuthController.login
	)
	.get(
		'/refresh',
		passport.authenticate('jwt', { session: false }),
		AuthController.refresh,
	)
	.post(
		'/forgotPassword',
		AuthController.forgotPassword
	)
	.post(
		'/createPassword/:id/:registerToken',
		AuthController.createPassword
	)
	.get(
		'/logout',
		passport.authenticate('jwt', { session: false }),
		AuthController.logout,
	)
	.post(
		'/changePassword',
		passport.authenticate('jwt', { session: false }),
		AuthController.changePassword,
	);
