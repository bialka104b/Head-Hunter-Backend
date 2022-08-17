import { Request, Response } from 'express';
import { jsonResponse } from '../../utils/jsonResponse';
import {
	JsonResponseStatus,
	TraineeProfileEntity,
	UserRole,
} from '../../types';
import { TraineeProfileRecord } from '../../records/trainee-profie/trainee-profile.record';
import { InterviewRecord } from '../../records/interview/interview.record';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { paginationValidation } from '../../utils/paginationValidation';
import { TraineeProfileRequest } from '../../types/trainee-profile/trainee-profile.request';

const { notAuthorised, incorrectId } = ValidationError.messages.auth;
const { traineeNotExist } =
	ValidationError.messages.recordInstanceInit.traineeProfile;

class TraineesController {
	static async getAllListedTrainees(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const count = await TraineeProfileRecord.getCountOfTrainees();
			const limit = Number(req.params.limit);
			const pages = Math.ceil(count / limit);

			let currentPage = Number(req.params.currentPage);

			currentPage = paginationValidation(currentPage, pages);

			const offsetElement = limit * (currentPage - 1);

			const listedTrainees =
				await TraineeProfileRecord.getAllListedTrainees(
					limit,
					offsetElement,
				);
			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Listed trainees successfully fetched.',
					data: {
						count,
						currentPage,
						pages,
						listedTrainees,
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async getTraineeProfile(req: Request, res: Response): Promise<void> {
		let traineeId: string = null;
		const { role, id } = req.user as UserRecord;
		if (role === UserRole.trainee) {
			traineeId = id;
		} else {
			traineeId = req.params.userId;
		}

		try {
			const traineeProfile =
				await TraineeProfileRecord.getFullTraineeInfo(traineeId);

			if (traineeProfile) {
				res.status(200).json(
					jsonResponse({
						code: 200,
						status: JsonResponseStatus.success,
						message: "Trainee's profile successfully fetched.",
						data: { traineeProfile },
					}),
				);
			} else {
				throw new ValidationError(traineeNotExist, 404);
			}
		} catch (e) {
			throw e;
		}
	}

	static async getInterviewsTraineesList(
		req: Request,
		res: Response,
	): Promise<void> {
		const { id, role } = req.user as UserRecord;

		if (role !== UserRole.hr) {
			throw new ValidationError(notAuthorised, 400);
		}

		try {
			const count =
				await InterviewRecord.getCountOfTraineesInterviewsForHr(id);
			const limit = Number(req.params.limit);
			const pages = Math.ceil(count / limit);
			let currentPage = Number(req.params.currentPage);

			currentPage = paginationValidation(currentPage, pages);

			const offsetElement = limit * (currentPage - 1);
			const traineesIdList =
				await InterviewRecord.getInterviewsTraineeList(
					id,
					limit,
					offsetElement,
				);

			const interviewsTraineesList = [];

			if (traineesIdList !== null) {
				for (const { traineeId } of traineesIdList) {
					const traineeInfo =
						await TraineeProfileRecord.getTraineesInfoForTraineesInterviewsListById(
							traineeId,
						);
					if (traineeInfo !== null) {
						interviewsTraineesList.push(traineeInfo);
					}
				}
			}

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: "Trainee's profile successfully fetched.",
					data: { interviewsTraineesList },
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async editProfile(req: Request, res: Response) {
		const {
			userId,
			firstName,
			lastName,
			githubUsername,
			tel,
			bio,
			education,
			targetWorkCity,
			workExperience,
			portfolioUrl1,
			portfolioUrl2,
			portfolioUrl3,
			portfolioUrl4,
			portfolioUrl5,
			projectUrl1,
			projectUrl2,
			projectUrl3,
			projectUrl4,
			projectUrl5,
			courses,
			expectedTypeWork,
			expectedContractType,
			canTakeApprenticeship,
			monthsOfCommercialExp,
			expectedSalary,
		} = req.body as TraineeProfileRequest;

		const projectUrls = [
			projectUrl1,
			projectUrl2,
			projectUrl3,
			projectUrl4,
			projectUrl5,
		];
		const portfolioUrls = [
			portfolioUrl1,
			portfolioUrl2,
			portfolioUrl3,
			portfolioUrl4,
			portfolioUrl5,
		];

		const traineeProfileValues: TraineeProfileEntity = {
			firstName,
			lastName,
			githubUsername,
			tel,
			bio,
			education,
			targetWorkCity,
			workExperience: workExperience,
			projectUrls: projectUrls.filter((obj) => obj !== ''),
			portfolioUrls: portfolioUrls.filter((obj) => obj !== ''),
			expectedTypeWork,
			expectedContractType,
			canTakeApprenticeship: canTakeApprenticeship === 'true' ?? true,
			monthsOfCommercialExp: Number(monthsOfCommercialExp),
			expectedSalary: expectedSalary,
			courses,
		};

		const user = await UserRecord.getUserById(userId);

		if (!user) {
			throw new ValidationError(incorrectId, 400);
		}

		if (user.role !== UserRole.trainee) {
			throw new ValidationError(notAuthorised, 400);
		}

		try {
			const trainee = await TraineeProfileRecord.getTraineeProfileById(
				user.id,
			);

			if (!trainee) {
				const newTrainee = new TraineeProfileRecord(
					traineeProfileValues,
				);

				newTrainee.userId = user.id;

				await newTrainee.insertMe();
			} else {
				await TraineeProfileRecord.updateTrainee(
					traineeProfileValues,
					user.id,
				);
			}

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: "Trainee's profile successfully update.",
					data: {
						trainee:
							await TraineeProfileRecord.getTraineeProfileById(
								user.id,
							),
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}
}

export { TraineesController };
