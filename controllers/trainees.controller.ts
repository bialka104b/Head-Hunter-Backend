import { Request, Response } from 'express';
import { jsonResponse } from '../utils/jsonResponse';
import { JsonResponseStatus } from '../types/api/json-response';
import {
	TraineeProfileRecord,
} from '../records/trainee-profie/trainee-profile.record';

class TraineesController {
	static async getAllListedTrainees(req: Request, res: Response): Promise<void> {
		try {
			const listedTrainees = await TraineeProfileRecord.getAllListedTrainees();
			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Listed trainees successfully fetched.',
					data: { listedTrainees },
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
