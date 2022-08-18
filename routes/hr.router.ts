import { Router } from 'express';
import passport from 'passport';
import { hrController } from '../controllers/hr/hr.controller';

export const hrRouter = Router();

hrRouter.post(
	'/editProfile',
	passport.authenticate('jwt', { session: false }),
	hrController.editProfile,
);
