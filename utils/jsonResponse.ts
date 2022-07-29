import { JsonResponse } from '../types/api/json-response';

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
