import { Request, Response } from 'express';
import { HrProfileRequest, JsonResponseStatus, UserRole } from '../../types';
import { jsonResponse } from '../../utils/jsonResponse';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { HrProfileRecord } from '../../records/hr-profile/hr-profile.record';
import { paginationValidation } from '../../utils/paginationValidation';

const { incorrectId, notAuthorised } = ValidationError.messages.auth;

class hrController {
	static async editProfile(req: Request, res: Response) {
		const { maxReservedStudents, company, fullName } =
			req.body as HrProfileRequest;

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
				await HrProfileRecord.updateHr(
					{
						maxReservedStudents,
						company,
						fullName,
					},
					user.id,
				);
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
					message: "Hr's profile successfully update.",
					data: {
						hr: await HrProfileRecord.getHrProfileById(user.id),
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async getHrList(req: Request, res: Response): Promise<void> {
		try {
			const count = await HrProfileRecord.getCountOfHr();
			const limit = Number(req.query.limit) || 10;
			const pages = Math.ceil(count / limit);
			let page = paginationValidation(Number(req.query.page), pages);
			const offsetElement = limit * (page - 1);

			const hrList = await HrProfileRecord.getHrList(
				limit,
				offsetElement,
			);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: "Hr's list successfully fetched.",
					data: {
						page,
						count,
						pages,
						hrList,
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}
}

export { hrController };
