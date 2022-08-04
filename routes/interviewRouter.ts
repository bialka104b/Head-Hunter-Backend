import express = require('express');
import passport from 'passport';
import { InterviewController } from '../controllers/interview/interview.controller';

const interviewRouter = express.Router();

interviewRouter
	.get('/add/:userId', passport.authenticate('jwt', { session: false }), InterviewController.AddInterview)

export {
	interviewRouter,
};
