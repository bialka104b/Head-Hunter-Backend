import { Router } from 'express';
import passport from 'passport';
import { AdminController } from '../controllers/admin/admin.controller';
import { upload } from '../importFile/importFile';
import { TraineesController } from '../controllers/trainees/trainees.controller';

export const adminRouter = Router();

adminRouter
	.delete('/', passport.authenticate('jwt', { session: false }), AdminController.deleteUser)
	.get('/cancelHire/:traineeId', passport.authenticate('jwt', { session: false }), TraineesController.cancelHired)
	.post('/importTrainees', passport.authenticate('jwt', { session: false }), upload.single('file'), AdminController.importTraineesFromCsvFile);

