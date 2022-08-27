import { JsonResponse } from '../types';

const jsonResponse = ({ code, status, message, data }: JsonResponse) => {
	return {
		code,
		status,
		message,
		data: {
			...data,
		},
	};
};

export {
	jsonResponse,
};
