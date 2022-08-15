import { Request, Response } from 'express';
import { UserRecord } from '../../records/user/user.record';
import { JsonResponseStatus, UserImport, UserRole } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import { jsonResponse } from '../../utils/jsonResponse';
import { parse } from 'papaparse';
import { getRandomPassword } from '../../utils/getRandomPassword';
import { TraineeScoreRecord } from '../../records/trainee-score/trainee-score.record';

const { readFile } = require('fs').promises;

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

			await UserRecord.deleteUserById(id);

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

	static async importTraineesFromCsvFile(req: Request, res: Response) {
		try {
			const file: string = await readFile(req.body.file, 'utf8');
			const convertToJSONFile = parse(file, {
				header: true,
				skipEmptyLines: true,
				dynamicTyping: true,
			});

			const JSONListOfImportTrainees = convertToJSONFile.data as UserImport[];
			const userThatWasAlreadyExist = [];

			for (const trainee of JSONListOfImportTrainees) {
				if (await UserRecord.findUserByEmail(trainee.email)) {
					userThatWasAlreadyExist.push(trainee.email);
				} else {
					const user = new UserRecord({
						email: trainee.email,
						password: getRandomPassword(),
						role: UserRole.trainee,
					});

					const userId = await user.insertMe();

					const traineeScore = new TraineeScoreRecord({
						courseCompletion: Number(trainee.courseCompletion),
						courseEngagment: Number(trainee.courseEngagment),
						projectDegree: Number(trainee.projectDegree),
						teamProjectDegree: Number(trainee.teamProjectDegree),
						bonusProjectUrls: trainee.bonusProjectUrls,
						userId,
					});

					await traineeScore.insertMe();
				}
			}

			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee\'s profile successfully fetched.',
					data: { userThatWasAlreadyExist },
				}));

		} catch (e) {
			console.log(e);
		}
	}
}

export {
	AdminController,
};
