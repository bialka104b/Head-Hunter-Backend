import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import cors from 'cors';
import { globalErrorHandler } from './utils/globalErrorHandler';
import './authentication/JwtStrategy';
import { authRouter } from './routes/auth.router';
import { router as usersRouter } from './routes/users.router';

const port = process.env.PORT || 3001;
const app = express();

// middleware:
app.use(cors({
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
	}),
);
app.use(express.urlencoded({ extended: false })); //@TODO - don't think we'll use it with react-fe;
app.use(express.json());
app.use(cookieParser());

//TODO - create db connection test (maybe should be in db/pool file);

// Routes:
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

// Global error handler:
app.use(globalErrorHandler);

// Run:
app.listen(Number(port), '0.0.0.0', () => {
	console.log(`Listening on: http://localhost:${port}`);
});
