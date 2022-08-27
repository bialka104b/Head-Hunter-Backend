import { Request, Response } from 'express';
import { jsonResponse } from '../../utils/jsonResponse';
import {
	JsonResponseStatus,
	TraineeFilterRequest,
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
import {
	sendApproveHireMail,
	sendHireInformationMail,
} from '../../mailService/sendMail';
import { HrProfileRecord } from '../../records/hr-profile/hr-profile.record';

const {
	notAuthorised,
	incorrectId,
	incorrectRole,
} = ValidationError.messages.auth;
const { traineeNotExist } = ValidationError.messages.recordInstanceInit.traineeProfile;
const { userIsActive } = ValidationError.messages.recordInstanceInit.user;

class TraineesController {
	static async getTrainees(req: Request<{}, {}, {}, TraineeFilterRequest>, res: Response): Promise<void> {
		const {
			search,
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
			canTakeApprenticeship,
			monthsOfCommercialExp,
			expectedTypeWork,
			expectedSalaryFrom,
			expectedSalaryTo,
			sortType,
			sortByType,
			expectedContractType,
			status,
		}: TraineeFilterRequest = req.query;
		const { id, role } = req.user as UserRecord;

		const userId = role === UserRole.hr && status === 'interviewed' ? id : null;

		try {
			const count = await TraineeProfileRecord.getCountOfTraineesList(
				status,
				Number(courseCompletion),
				Number(courseEngagment),
				Number(projectDegree),
				Number(teamProjectDegree),
				Number(monthsOfCommercialExp),
				expectedTypeWork,
				expectedSalaryFrom,
				expectedSalaryTo,
				canTakeApprenticeship,
				expectedContractType
					?.split(',')
					.sort()
					.filter((type) => type !== '') || [],
				search,
				userId,
			);
			const limit = Number(req.query.limit) || 10;
			const pages = Math.ceil(count / limit);
			let page = paginationValidation(Number(req.query.page), pages);
			const offsetElement = limit * (page - 1);

			const users = await TraineeProfileRecord.getTraineesList(
				status,
				Number(courseCompletion),
				Number(courseEngagment),
				Number(projectDegree),
				Number(teamProjectDegree),
				Number(monthsOfCommercialExp),
				expectedTypeWork,
				expectedSalaryFrom,
				expectedSalaryTo,
				canTakeApprenticeship,
				expectedContractType
					?.split(',')
					.sort()
					.filter((type) => type !== '') || [],
				search,
				sortByType,
				sortType,
				limit,
				offsetElement,
				userId,
			);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Listed trainees successfully fetched.',
					data: {
						count,
						page,
						pages,
						users,
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async getAllListedTrainees(req: Request, res: Response): Promise<void> {
		try {
			const count = await TraineeProfileRecord.getCountOfTrainees();
			const limit = Number(req.params.limit);
			const pages = Math.ceil(count / limit);

			let currentPage = Number(req.params.currentPage);

			currentPage = paginationValidation(currentPage, pages);

			const offsetElement = limit * (currentPage - 1);
			const listedTrainees = await TraineeProfileRecord.getAllListedTrainees(limit, offsetElement);

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
		const traineeId = req.params.userId;
		const { role, id } = req.user as UserRecord;

		if (role === UserRole.trainee && id !== traineeId) {
			throw new ValidationError(notAuthorised, 400);
		}

		const traineeProfile = await TraineeProfileRecord.getFullTraineeInfo(traineeId);

		if (!traineeProfile) {
			throw new ValidationError(traineeNotExist, 404);
		}

		try {
			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee\'s profile successfully fetched.',
					data: { traineeProfile },
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
			expectedSalary: Number(expectedSalary),
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
			const trainee = await TraineeProfileRecord.getTraineeProfileById(user.id);

			if (!trainee) {
				const newTrainee = new TraineeProfileRecord(traineeProfileValues);

				newTrainee.userId = user.id;
				await newTrainee.insertMe();
			} else {
				await TraineeProfileRecord.updateTrainee(traineeProfileValues, user.id);
			}

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee\'s profile successfully update.',
					data: {
						trainee: await TraineeProfileRecord.getTraineeProfileById(user.id),
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async hire(req: Request, res: Response) {
		const { id, role } = req.user as UserRecord;

		if (role !== UserRole.hr) {
			throw new ValidationError(notAuthorised, 400);
		}

		const { traineeId } = req.body;

		const userTrainee = await UserRecord.getUserById(traineeId);

		if (!userTrainee) {
			throw new ValidationError(traineeNotExist, 400);
		}

		if (userTrainee.role !== UserRole.trainee) {
			throw new ValidationError(incorrectRole, 400);
		}

		try {
			const hr = await HrProfileRecord.getHrProfileById(id);
			const admin = await UserRecord.getAdminEmail();
			const trainee = await TraineeProfileRecord.getTraineeProfileById(
				traineeId,
			);

			await sendApproveHireMail(userTrainee.email, hr.fullName);
			await sendHireInformationMail(
				admin[0].email,
				trainee.firstName,
				trainee.lastName,
				hr.fullName,
			);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message:
						'Hire process is successfully start. Right now trainee must approve hire.',
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async approveHire(req: Request, res: Response) {
		const { id, role } = req.user as UserRecord;

		if (role !== UserRole.trainee) {
			throw new ValidationError(notAuthorised, 400);
		}

		try {
			const trainee = new TraineeProfileRecord(
				await TraineeProfileRecord.getTraineeProfileById(id),
			);
			await trainee.updateStatus(TraineeStatus.hired);
			await UserRecord.deleteUserById(id);
			await InterviewRecord.deleteTraineeFromInterviewTable(id);

			res.status(200)
				.clearCookie('jwt')
				.json(
					jsonResponse({
						code: 200,
						status: JsonResponseStatus.success,
						message: 'Trainee\'s is hire. Congratulations !',
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
					message: 'Trainee\'s is successfully reactivate.',
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}
}

export { TraineesController };
