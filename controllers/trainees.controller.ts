import { Request, Response } from 'express';
import { jsonResponse } from '../utils/jsonResponse';
import { JsonResponseStatus } from '../types';
import { TraineeProfileRecord } from '../records/trainee-profie/trainee-profile.record';

class TraineesController {
	static async getAllListedTrainees(req: Request, res: Response): Promise<void> {
		try {

			const count = await TraineeProfileRecord.getCountOfTrainees();
			const limit = Number(req.params.limit);
			const pages = Math.ceil(count / limit);

			let currentPage = Number(req.params.currentPage);

			if(currentPage < 1) {
				currentPage = 1
			}

			if(currentPage > pages) {
				currentPage = pages
			}
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
}

export {
	TraineesController,
};
