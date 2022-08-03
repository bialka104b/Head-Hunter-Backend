import express = require('express');
import { TraineesController } from '../controllers/trainees.controller';
import passport from 'passport';

const traineesRouter = express.Router();

traineesRouter
	.get('/',TraineesController.getAllListedTrainees)
	.get('/interviewsList', passport.authenticate('jwt', { session: false }), TraineesController.getInterviewsTraineesList)
	.get('/:id', passport.authenticate('jwt', { session: false }),TraineesController.getTraineeProfile);

export {
	traineesRouter,
};
