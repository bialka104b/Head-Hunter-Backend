import express = require('express');
import { TraineesController } from '../controllers/trainees/trainees.controller';
import passport from 'passport';

const traineesRouter = express.Router();

traineesRouter
	.get(
		'/:limit/:currentPage',
		passport.authenticate('jwt', { session: false }),
		TraineesController.getAllListedTrainees,
	)
	.get(
		'/interviewsList/:limit/:currentPage',
		passport.authenticate('jwt', { session: false }),
		TraineesController.getInterviewsTraineesList,
	)
	.post('/editProfile',
		passport.authenticate('jwt', { session: false }),
		TraineesController.editProfile)
	.get(
		'/:userId',
		passport.authenticate('jwt', { session: false }),
		TraineesController.getTraineeProfile,
	);

export { traineesRouter };
