import express = require('express');
import { TraineesController } from '../controllers/trainees/trainees.controller';
import passport from 'passport';

export const traineesRouter = express.Router();

traineesRouter
	.post(
		'/hire',
		passport.authenticate('jwt', { session: false }),
		TraineesController.hire,
	)
	.get(
		'/approveHire',
		passport.authenticate('jwt', { session: false }),
		TraineesController.approveHire,
	)
	.get(
		'/:limit/:currentPage',
		passport.authenticate('jwt', { session: false }),
		TraineesController.getAllListedTrainees,
	)
	.post(
		'/editProfile',
		passport.authenticate('jwt', { session: false }),
		TraineesController.editProfile,
	)
	.get(
		'/:userId',
		passport.authenticate('jwt', { session: false }),
		TraineesController.getTraineeProfile,
	)
	.get(
		'/',
		passport.authenticate('jwt', { session: false }),
		TraineesController.getTrainees,
	);
