import { Request, Response } from 'express';
import {
	HrProfileEntity,
	JsonResponseStatus,
	UserRole,
} from '../../types';
import { jsonResponse } from '../../utils/jsonResponse';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { HrProfileRecord } from '../../records/hr-profile/hr-profile.record';

const { incorrectId, notAuthorised } = ValidationError.messages.auth;
const { hrAlreadyExist } = ValidationError.messages.hr;

class hrController {

	static async addProfile(req: Request, res: Response) {
		const {
			maxReservedStudents,
			company,
			fullName,
		} = req.body as HrProfileEntity;

		const user = req.user as UserRecord;

		if (!user) {
			throw new ValidationError(incorrectId, 400);
		}

		if (user.role !== UserRole.hr) {
			throw new ValidationError(notAuthorised, 400);
		}

		const hr = await HrProfileRecord.getHrProfileById(user.id);

		if (hr) {
			throw new ValidationError(hrAlreadyExist, 200);
		}

		try {
			const newHr = new HrProfileRecord({
				maxReservedStudents,
				company,
				fullName,
				userId: user.id
			});

			newHr.fullName = req.body.fullName;
			newHr.maxReservedStudents = req.body.maxReservedStudents;
			newHr.company = req.body.company;

			await newHr.insertMe();

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'HR\'s profile successfully update.',
					data: {
						hr: await HrProfileRecord.getHrProfileById(user.id),
					},
				}));
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	hrController,
};
