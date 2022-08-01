import express = require('express');
import { TraineesController } from '../controllers/trainees.controller';

const traineesRouter = express.Router();

router
	.get('/', TraineesController.getAllListedTrainees)
	.get('/:id', TraineesController.getTraineeProfile);

export {
	traineesRouter,
};
