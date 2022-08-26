import { Request, Response } from 'express';
import { UserRecord } from '../../records/user/user.record';
import { JsonResponseStatus, UserImport, UserRole } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import { jsonResponse } from '../../utils/jsonResponse';
import { parse } from 'papaparse';
import { getRandomPassword } from '../../utils/getRandomPassword';
import { TraineeScoreRecord } from '../../records/trainee-score/trainee-score.record';
import { sendRegisterMail } from '../../mailService/sendMail';

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
			const file: string = await readFile(req.file.path, 'utf8');
			const convertToJSONFile = parse(file, {
				header: true,
				skipEmptyLines: true,
				dynamicTyping: true,
			});

			const correctCsvFileColumnName = [
				'email',
				'courseCompletion',
				'courseEngagment',
				'projectDegree',
				'teamProjectDegree',
				'bonusProjectUrls',
			];
			const csvFileColumnName = convertToJSONFile.meta.fields;

			const JSONListOfImportTrainees = convertToJSONFile.data as UserImport[];
			let countOfAddedTrainee = 0;
			const traineeWithBadData = [];

			if (correctCsvFileColumnName.length !== csvFileColumnName.length || !correctCsvFileColumnName.every((val, i) => val === csvFileColumnName[i])) {
				res
					.status(400)
					.json(jsonResponse({
						code: 400,
						status: JsonResponseStatus.failed,
						message: 'Incorrect column name in csv file. Check that column names are the same as in example',
						data: {
							columnName: csvFileColumnName,
						},
					}));
			} else {
				for (const trainee of JSONListOfImportTrainees) {
					try {
						if (!(await UserRecord.findUserByEmail(trainee.email))) {
							const user = new UserRecord({
								email: trainee.email,
								password: getRandomPassword(),
								role: UserRole.trainee,
								isActive: false,
							});

							const traineeScore = new TraineeScoreRecord({
								courseCompletion: Number(trainee.courseCompletion),
								courseEngagment: Number(trainee.courseEngagment),
								projectDegree: Number(trainee.projectDegree),
								teamProjectDegree: Number(trainee.teamProjectDegree),
								bonusProjectUrls: trainee.bonusProjectUrls,
							});

							const userId = await user.insertMe();

							traineeScore.userId = userId;

							await traineeScore.insertMe();

							await sendRegisterMail(user.email, userId, user.registerToken);

							countOfAddedTrainee++;
						}
					} catch (e) {
						traineeWithBadData.push({
							trainee,
							error: e.message,
						});
					}
				}

				res
					.status(200)
					.json(jsonResponse({
						code: 200,
						status: JsonResponseStatus.success,
						message: 'Trainee\'s profile successfully fetched.',
						data: {
							countOfAddedTrainee,
							traineeWithBadData,
						},
					}));
			}
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	AdminController,
};
