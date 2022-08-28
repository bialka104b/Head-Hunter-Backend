import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import cors from 'cors';
import { globalErrorHandler } from './utils/globalErrorHandler';
import './authentication/JwtStrategy';
import { authRouter } from './routes/auth.router';
import { traineesRouter } from './routes/trainees.router';
import { interviewRouter } from './routes/interviewRouter';
import { adminRouter } from './routes/admin.router';
import { changeInterviewTraineesStatus } from './utils/changeInterviewTraineesStatus';
import { config } from './config/config';

const app = express();

// middleware:
app.use(
	cors({
		origin: config.frontend.host,
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
	}),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes:
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/trainees', traineesRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/interview', interviewRouter);

// Change interview trainees status when they was in interviews list long than 10 days
changeInterviewTraineesStatus();

// Global error handler:
app.use(globalErrorHandler);

// Run:
app.listen(config.app.port, config.app.host, () => {
	console.log(`Listening on: ${config.app.host}:${config.app.port}`);
});
