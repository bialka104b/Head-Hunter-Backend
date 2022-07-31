import { Request, Response } from 'express';
import { UserRecord } from '../records/user/user.record';
import { JsonResponseStatus } from '../types/api/json-response';
import { jsonResponse } from '../utils/jsonResponse';
import {
	TraineeListedRecord,
} from '../records/trainee-listed/trainee-listed.record';

class UsersController {
	//TODO - example:
	static getAllUsers = async (req: Request, res: Response): Promise<void> => {
		try {
			const usersList = await UserRecord.getAllUsers();
			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Users list successfully fetched.',
					data: { usersList },
				}));
		} catch (e) {
			console.log(e);
		}
	};

	static async getAllListedTrainees(req: Request, res: Response): Promise<void> {
		try {
			const listedTrainees = await TraineeListedRecord.getAllListedTrainees();
			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Listed trainees successfully fetched.',
					data: { listedTrainees },
				}));
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	UsersController,
};
