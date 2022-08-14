import { Request, Response } from 'express';
import { UserRecord } from '../../records/user/user.record';
import { JsonResponseStatus, UserRole } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import { jsonResponse } from '../../utils/jsonResponse';

const {
	notAuthorised,
	incorrectId,
} =
	ValidationError.messages.auth;

class AdminController {

	static async deleteUser(req: Request, res: Response) {
		const { id } = req.body;
		const { role } = req.user as UserRecord;

		if (role !== UserRole.admin) {
			throw new ValidationError(notAuthorised, 400);
		}

		if (!(await UserRecord.getUserById(id))) {
			throw new ValidationError(incorrectId, 200);
		}

		try {

			await UserRecord.deleteUserById(id)

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Delete user successfully.',
					data: {
						deleteUserId: id,
					},
				}));
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	AdminController,
};
