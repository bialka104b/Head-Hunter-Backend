import { Request, Response } from 'express';
import { UserRecord } from '../../records/user/user.record';
import { JsonResponseStatus } from '../../types';
import { jsonResponse } from '../../utils/jsonResponse';

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
}

export {
	UsersController,
};
