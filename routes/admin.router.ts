import { Router } from 'express';
import passport from 'passport';
import { AdminController } from '../controllers/admin/admin.controller';

export const adminRouter = Router();

adminRouter
	.delete('/', passport.authenticate('jwt', { session: false }), AdminController.deleteUser)
	.post('/importTrainees', passport.authenticate('jwt', { session: false }), AdminController.importTraineesFromCsvFile);

