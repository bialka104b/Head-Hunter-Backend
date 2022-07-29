import { Request, Response } from 'express';
import { UserRecord } from '../records/user/user.record';
import { JsonResponseStatus } from '../types/api/json-response';
import { jsonResponse } from '../utils/jsonResponse';

class UsersController {
	static getAllUsers = async (req: Request, res: Response) => {
		try {
			const usersList = await UserRecord.getAllUsers();

			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Users list successfully fetched.',
					data: { foundRecords: usersList.length, usersList }, //@TODO - should be typed for every response;
				}));
		} catch (e) {
			console.log(e);
		}
	};
}

export {
	UsersController,
};
