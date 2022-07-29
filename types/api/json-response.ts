export enum JsonResponseStatus {
	success = 'success',
	failed = 'failed,'
}

export interface JsonResponse {
	code: number,
	status: JsonResponseStatus,
	message: string,
	data?: {}
}
