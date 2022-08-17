import { Router } from 'express';
import passport from 'passport';
import { AdminController } from '../controllers/admin/admin.controller';
import { upload } from '../importFile/importFile';

export const adminRouter = Router();

adminRouter
	.delete('/', passport.authenticate('jwt', { session: false }), AdminController.deleteUser)
	.post('/importTrainees', passport.authenticate('jwt', { session: false }), upload.single('file'), AdminController.importTraineesFromCsvFile);

