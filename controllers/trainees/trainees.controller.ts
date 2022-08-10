import { Request, Response } from 'express';
import { jsonResponse } from '../../utils/jsonResponse';
import { FilteredInfo, JsonResponseStatus } from '../../types';
import { TraineeProfileRecord } from '../../records/trainee-profie/trainee-profile.record';
import { InterviewRecord } from '../../records/interview/interview.record';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { paginationValidation } from '../../utils/paginationValidation';

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

		if (role !== 'hr') {
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

			for (const { traineeId } of traineesIdList) {
				const traineeInfo = await TraineeProfileRecord.getTraineesInfoForTraineesInterviewsListById(traineeId);
				interviewsTraineesList.push(traineeInfo);
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

	static async getFilteredTrainees(req: Request, res: Response) {
		try {
			const {
				courseCompletion,
				courseEngagment,
				projectDegree,
				teamProjectDegree,
				expectedTypeWork,
				expectedContractType,
				canTakeApprenticeship,
				monthsOfCommercialExp,
				expectedSalaryFrom,
				expectedSalaryTo,
			} = req.body;

			const filteredInfo: FilteredInfo = {
				courseCompletion: Number(courseCompletion),
				courseEngagment: Number(courseEngagment),
				projectDegree: Number(projectDegree),
				teamProjectDegree: Number(teamProjectDegree),
				canTakeApprenticeship: canTakeApprenticeship === 'true',
				monthsOfCommercialExp: Number(monthsOfCommercialExp),
				expectedSalaryFrom: Number(expectedSalaryFrom),
				expectedSalaryTo: Number(expectedSalaryTo),
			};

			const expectedContractTypeArray = JSON.parse(expectedContractType);
			const expectedTypeWorkArray = JSON.parse(expectedTypeWork)

			const filteredTrainees = await TraineeProfileRecord.getFilteredTrainees(filteredInfo);


			for(const trainees of filteredTrainees) {
				for(const expectedContractType of expectedContractTypeArray) {
					if(!JSON.parse(String(trainees.expectedContractType)).includes(expectedContractType)) {
						filteredTrainees.splice(filteredTrainees.indexOf(trainees), 1)
					}
				}

				if(!expectedTypeWorkArray.includes(trainees.expectedTypeWork)) {
					filteredTrainees.splice(filteredTrainees.indexOf(trainees), 1)
				}
			}

			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee\'s filtered successfully fetched.',
					data: { filteredTrainees },
				}));
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	TraineesController,
};
