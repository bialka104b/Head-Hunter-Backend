import express = require('express');
import { TraineesController } from '../controllers/trainees.controller';

const traineesRouter = express.Router();

traineesRouter
	.get('/:limit/:currentPage', TraineesController.getAllListedTrainees)
	.get('/:id', TraineesController.getTraineeProfile);

export {
	traineesRouter,
};
