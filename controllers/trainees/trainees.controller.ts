import { Request, Response } from 'express';
import { jsonResponse } from '../../utils/jsonResponse';
import {
	JsonResponseStatus,
	TraineeProfileEntity,
	TraineeProfileRequest,
	TraineeStatus,
	UserRole,
} from '../../types';
import { TraineeProfileRecord } from '../../records/trainee-profie/trainee-profile.record';
import { InterviewRecord } from '../../records/interview/interview.record';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { paginationValidation } from '../../utils/paginationValidation';

const { notAuthorised, incorrectId, incorrectRole } =
	ValidationError.messages.auth;
const { traineeNotExist } =
	ValidationError.messages.recordInstanceInit.traineeProfile;
const { userIsActive } = ValidationError.messages.recordInstanceInit.user;

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
		const traineeId = req.params.userId
		const { role, id } = req.user as UserRecord;

		if(role === UserRole.trainee && id !== traineeId) {
			throw new ValidationError(notAuthorised, 400)
		}

		const traineeProfile = await TraineeProfileRecord.getFullTraineeInfo(
			traineeId,
		);

		if (!traineeProfile) {
			throw new ValidationError(traineeNotExist, 404);
		}

		try {
			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: "Trainee's profile successfully fetched.",
					data: { traineeProfile },
				}),
			);
		} catch (e) {
			console.log(e);
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

	static async hire(req: Request, res: Response) {
		const traineeId = req.params.traineeId as string;

		const userTrainee = await UserRecord.getUserById(traineeId);

		if (!userTrainee) {
			throw new ValidationError(traineeNotExist, 400);
		}

		if (userTrainee.role !== UserRole.trainee) {
			throw new ValidationError(incorrectRole, 400);
		}

		try {
			const trainee = new TraineeProfileRecord(
				await TraineeProfileRecord.getTraineeProfileById(traineeId),
			);
			await trainee.updateStatus(TraineeStatus.hired);

			await UserRecord.deleteUserById(traineeId);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: "Trainee's is hire. Congratulations !",
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async cancelHired(req: Request, res: Response) {
		const { role } = req.user as UserRecord;

		if (role !== UserRole.admin) {
			throw new ValidationError(notAuthorised, 400);
		}

		const traineeId = req.params.traineeId as string;

		const userTrainee = await UserRecord.getInactiveUserById(traineeId);

		if (!userTrainee) {
			throw new ValidationError(traineeNotExist, 400);
		}

		if (userTrainee.role !== UserRole.trainee) {
			throw new ValidationError(incorrectRole, 400);
		}

		if (Boolean(userTrainee.isActive) === true) {
			throw new ValidationError(userIsActive, 400);
		}

		try {
			const trainee = new TraineeProfileRecord(
				await TraineeProfileRecord.getTraineeProfileById(traineeId),
			);
			await trainee.updateStatus(TraineeStatus.available);

			await UserRecord.reactivateUser(traineeId);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: "Trainee's is successfully reactivate.",
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}
}

export { TraineesController };
