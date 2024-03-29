import { NextFunction, Request, Response } from 'express';
import { ValidationError } from './ValidationError';

export const globalErrorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.status(err instanceof ValidationError ? err.code : 500).json({
		title:
			err instanceof ValidationError
				? 'Validation Error'
				: 'Server Error',
		code: err instanceof ValidationError ? err.code : 500,
		message:
			err instanceof ValidationError
				? err.message
				: 'Something went wrong.',
	});
};
