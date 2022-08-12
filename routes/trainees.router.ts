import express = require('express');
import {
	TraineesController,
} from '../controllers/trainees/trainees.controller';

const traineesRouter = express.Router();

traineesRouter
	.get('/', TraineesController.getAllListedTrainees)
	.get('/interviewsList/:limit/:currentPage', TraineesController.getInterviewsTraineesList)
	.get('/:id', TraineesController.getTraineeProfile);

export {
	traineesRouter,
};
