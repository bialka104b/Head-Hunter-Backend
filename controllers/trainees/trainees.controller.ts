import { Request, Response } from 'express';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus, UserImport, UserRole } from '../../types';
import { TraineeProfileRecord } from '../../records/trainee-profie/trainee-profile.record';
import { InterviewRecord } from '../../records/interview/interview.record';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { paginationValidation } from '../../utils/paginationValidation';
import { parse } from 'papaparse';
import { getRandomPassword } from '../../utils/getRandomPassword';
import { TraineeScoreRecord } from '../../records/trainee-score/trainee-score.record';

const { readFile } = require('fs').promises;

const { notAuthorised } = ValidationError.messages.auth;


class TraineesController {
	static async getAllListedTrainees(req: Request, res: Response): Promise<void> {
		try {

			const count = await TraineeProfileRecord.getCountOfTrainees();
			const limit = Number(req.params.limit);
			const pages = Math.ceil(count / limit);

			let currentPage = Number(req.params.currentPage);

			currentPage = paginationValidation(currentPage, pages);

			const offsetElement = limit * (currentPage - 1);


			const listedTrainees = await TraineeProfileRecord.getAllListedTrainees(limit, offsetElement);
			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Listed trainees successfully fetched.',
					data: {
						count,
						currentPage,
						pages,
						listedTrainees,
					},
				}));
		} catch (e) {
			console.log(e);
		}
	}

	static async getTraineeProfile(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		try {
			const traineeProfile = await TraineeProfileRecord.getFullTraineeInfo(id);
			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee\'s profile successfully fetched.',
					data: { traineeProfile },
				}));
		} catch (e) {
			console.log(e);
		}
	}

	static async getInterviewsTraineesList(req: Request, res: Response): Promise<void> {
		const { id, role } = req.user as UserRecord;

		if (role !== UserRole.hr) {
			throw new ValidationError(notAuthorised, 400);
		}

		try {
			const count = await InterviewRecord.getCountOfTraineesInterviewsForHr(id);
			const limit = Number(req.params.limit);
			const pages = Math.ceil(count / limit);
			let currentPage = Number(req.params.currentPage);

			currentPage = paginationValidation(currentPage, pages);

			const offsetElement = limit * (currentPage - 1);
			const traineesIdList = await InterviewRecord.getInterviewsTraineeList(id, limit, offsetElement);

			const interviewsTraineesList = [];

			if (traineesIdList !== null) {
				for (const { traineeId } of traineesIdList) {
					const traineeInfo = await TraineeProfileRecord.getTraineesInfoForTraineesInterviewsListById(traineeId);
					if (traineeInfo !== null) {
						interviewsTraineesList.push(traineeInfo);
					}
				}
			}

			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee\'s profile successfully fetched.',
					data: { interviewsTraineesList },
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
	TraineesController,
};
