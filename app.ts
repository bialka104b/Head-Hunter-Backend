import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import cors from 'cors';
import { globalErrorHandler } from './utils/globalErrorHandler';
import './authentication/JwtStrategy';
import { authRouter } from './routes/auth.router';
import { router as usersRouter } from './routes/users.router';
import { mailRouter } from './routes/mail.router';
import { traineesRouter } from './routes/trainees.router';
import { interviewRouter } from './routes/interviewRouter';
import { adminRouter } from './routes/admin.router';
import { hrRouter } from './routes/hr.router';
import { changeInterviewTraineesStatus } from './utils/changeInterviewTraineesStatus';


const port = process.env.PORT || 3001;
const app = express();

// middleware:
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
		methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
	}),
);
app.use(express.urlencoded({ extended: false })); //@TODO - don't think we'll use it with react-fe;
app.use(express.json());
app.use(cookieParser());

//TODO - create db connection test (maybe should be in db/pool file);

// Routes:
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/mail', mailRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/trainees', traineesRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/interview', interviewRouter);
app.use('/api/v1/hr', hrRouter);

// Change interview trainees status when they was in interviews list long than 10 days
// changeInterviewTraineesStatus();

// Global error handler:
app.use(globalErrorHandler);

// Run:
app.listen(Number(port), '0.0.0.0', () => {
	console.log(`Listening on: http://localhost:${port}`);
});
