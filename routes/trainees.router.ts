import express = require('express');
import { TraineesController } from '../controllers/trainees/trainees.controller';
import passport from 'passport';

const traineesRouter = express.Router();

traineesRouter
	.get('/:limit/:currentPage', passport.authenticate('jwt', { session: false }), TraineesController.getAllListedTrainees)
	.get('/interviewsList/:limit/:currentPage', passport.authenticate('jwt', { session: false }), TraineesController.getInterviewsTraineesList)
	.get('/:id', passport.authenticate('jwt', { session: false }), TraineesController.getTraineeProfile)
	.post('/editProfile', TraineesController.editProfile);

export {
	traineesRouter,
};
