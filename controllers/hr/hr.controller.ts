import { Request, Response } from 'express';
import { HrProfileEntity, JsonResponseStatus, UserRole } from '../../types';
import { jsonResponse } from '../../utils/jsonResponse';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { HrProfileRecord } from '../../records/hr-profile/hr-profile.record';
import { paginationValidation } from '../../utils/paginationValidation';
import { getRandomPassword } from '../../utils/getRandomPassword';
import { sendRegisterMail } from '../../mailService/sendMail';

const { notAuthorised } = ValidationError.messages.auth;
const { hrAlreadyExist, hrNotExist } = ValidationError.messages.hr;
const { incorrectEmail } = ValidationError.messages.recordInstanceInit.user;

class hrController {
	static async addProfile(req: Request, res: Response) {
		const {
			email,
			maxReservedStudents,
			company,
			fullName,
		} = req.body;

		if (!email.includes('@')) {
			throw new ValidationError(incorrectEmail, 400);
		}

		const user = req.user as UserRecord;

		if (user.role !== UserRole.admin) {
			throw new ValidationError(notAuthorised, 400);
		}

		if (await UserRecord.findUserByEmail(email)) {
			throw new ValidationError(hrAlreadyExist, 400);
		}

		try {
			const user = new UserRecord({
				email,
				password: getRandomPassword(),
				role: UserRole.hr,
			});


			const newHr = new HrProfileRecord({
				maxReservedStudents,
				company,
				fullName,
				userId: user.id,
			});

			await user.insertMe();
			await newHr.insertMe();

			await sendRegisterMail(user.email, user.id, user.registerToken);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'HR\'s profile successfully added.',
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

			const users = (await HrProfileRecord.getHrList(
				limit,
				offsetElement,
			)) as HrProfileEntity[];

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Hr\'s list successfully fetched.',
					data: {
						page,
						count,
						pages,
						users,
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async updateMaxReservedStudents(req: Request, res: Response) {
		const user = req.user as UserRecord;

		const hrId = String(req.query.hrId);
		const maxReservedStudents = Number(req.query.maxReservedStudents);

		if (user.role !== UserRole.admin) {
			throw new ValidationError(notAuthorised, 400);
		}

		const hr = await HrProfileRecord.getHrProfileById(hrId);

		if (!hr) {
			throw new ValidationError(hrNotExist, 400);
		}

		try {
			await HrProfileRecord.updateMaxReservedStudents(hrId, maxReservedStudents);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Hr\'s list successfully fetched.',
					data: {
						hr: await HrProfileRecord.getHrProfileById(hrId),
					},
				}),
			);

		} catch (e) {
			console.log(e);
		}
	}
}

export { hrController };
