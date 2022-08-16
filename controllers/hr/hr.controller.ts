import { Request, Response } from 'express';
import {
	HrProfileRequest,
	JsonResponseStatus,
	UserRole,
} from '../../types';
import { jsonResponse } from '../../utils/jsonResponse';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { HrProfileRecord } from '../../records/hr-profile/hr-profile.record';

const { incorrectId, notAuthorised } = ValidationError.messages.auth;

class hrController {

	static async editProfile(req: Request, res: Response) {
		const {
			maxReservedStudents,
			company,
			fullName,
		} = req.body as HrProfileRequest;

		const user = req.user as UserRecord;

		if (!user) {
			throw new ValidationError(incorrectId, 400);
		}

		if (user.role !== UserRole.hr) {
			throw new ValidationError(notAuthorised, 400);
		}

		try {

			const hr = await HrProfileRecord.getHrProfileById(user.id);

			if (hr) {
				await HrProfileRecord.updateHr({
					maxReservedStudents,
					company,
					fullName,
				}, user.id);
			} else {
				const editHr = new HrProfileRecord(hr);

				editHr.fullName = req.body.fullName;
				editHr.maxReservedStudents = req.body.maxReservedStudents;
				editHr.company = req.body.company;

				await editHr.insertMe();
			}

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee\'s profile successfully update.',
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
