import { Request, Response } from 'express';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus } from '../../types';
import {
	TraineeProfileRecord,
} from '../../records/trainee-profie/trainee-profile.record';
import { InterviewRecord } from '../../records/interview/interview.record';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { paginationValidation } from '../../utils/paginationValidation';
import {convertToNumber as N} from '../../utils/convertToNumber';
const { notAuthorised } = ValidationError.messages.auth;


class TraineesController {
	static async getAllListedTrainees(req: Request, res: Response): Promise<void> {
		try {
			/*
			PATH model:
			http://localhost:3000/api/v1/trainees?limit=2&page=1

			If limit/page data not provided default values are:
				-page = 1
				-limit = 10
			*/
			/*Destructurization with renaming: */
			const { limit: limitQ, page: pageQ } = req.query;
			/*Setting data:*/
			const count = await TraineeProfileRecord.getCount();
			const limit = limitQ ? N(limitQ) : 10;
			const page = pageQ ? N(pageQ) : 1;
			const pages = Math.ceil(count / limit);
			const currentPage = paginationValidation(page, pages) ?? 1;
			const offsetElement = limit * (currentPage - 1);
			/*Get trainees:*/
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
}

export {
	TraineesController,
};
