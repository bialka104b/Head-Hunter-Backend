import { Router } from 'express';
import passport from 'passport';
import { AdminController } from '../controllers/admin/admin.controller';
import { hrController } from '../controllers/hr/hr.controller';
import { upload } from '../importFile/importFile';

export const adminRouter = Router();

adminRouter
	.delete(
		'/',
		passport.authenticate('jwt', { session: false }),
		AdminController.deleteUser,
	)
	.post(
		'/importTrainees',
		passport.authenticate('jwt', { session: false }),
		upload.single('file'),
		AdminController.importTraineesFromCsvFile,
	)
	.get(
		'/hr',
		passport.authenticate('jwt', { session: false }),
		hrController.getHrList,
	)
	.post(
		'/addHr',
		passport.authenticate('jwt', { session: false }),
		hrController.addProfile)
	.post(
		'/updateHrMaxReservedStudents',
		passport.authenticate('jwt', { session: false }),
		hrController.updateMaxReservedStudents);
