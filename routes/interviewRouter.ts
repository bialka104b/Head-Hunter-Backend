import express = require('express');
import passport from 'passport';
import { InterviewController } from '../controllers/interview/interview.controller';

export const interviewRouter = express.Router();

interviewRouter
	.get(
		'/add/:traineeId',
		passport.authenticate('jwt', { session: false }),
		InterviewController.addInterview
	)
	.delete(
		'/',
		passport.authenticate('jwt', { session: false }),
		InterviewController.deleteInterview);
