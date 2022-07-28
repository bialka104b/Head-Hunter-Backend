import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { globalErrorHandler } from './utils/globalErrorHandler';
import './authentication/JwtStrategy';
import { authRouter } from './routes/auth.router';

const port = process.env.PORT || 3001;
const app = express();

// middleware:
app.use(cors({
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
	}),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//TODO - create db connection test (maybe should be in db/pool file);

// Routes:
app.use('/auth', authRouter);

// Global error handler:
app.use(globalErrorHandler);

// Run:
app.listen(Number(port), '0.0.0.0', () => {
	console.log(`Listening on: http://localhost:${port}`);
});
