import { Request, Response } from 'express';
import { TraineeProfileRecord } from '../../records/trainee-profie/trainee-profile.record';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus, TraineeStatus } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import { InterviewRecord } from '../../records/interview/interview.record';
import { UserRecord } from '../../records/user/user.record';
import { HrProfileRecord } from '../../records/hr-profile/hr-profile.record';

const { interview, auth} = ValidationError.messages

class InterviewController {
	static async addInterview(req: Request, res: Response): Promise<void> {
		const trainee = new TraineeProfileRecord(await TraineeProfileRecord.getTraineeProfileById(req.params.traineeId))

		if(trainee.status !== TraineeStatus.available) {
			throw new ValidationError(interview.notAvailable, 400)
		}

		const hr = req.user as UserRecord;

		if (hr.role !== 'hr') {
			throw new ValidationError(auth.notAuthorised, 400);
		}

		const hrMaxReservedStudents = await HrProfileRecord.getHrMaxReservedStudentsInfo(hr.id)
		const countOfInterviewByHr = await InterviewRecord.getCountOfTraineesInterviewsForHr(hr.id);

		if(hrMaxReservedStudents <= countOfInterviewByHr) {
			throw new ValidationError(interview.hrMaxReservedStudents, 400)
		}

		try {
			const interview = new InterviewRecord({
				hrId: hr.id,
				traineeId: trainee.userId
			})

			await interview.insertMe()
			await trainee.updateStatus(TraineeStatus.interviewed)

			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee successfully added to interview.',
					data: {
						id: interview.id,
						date: interview.createdAt,
					},
				}));
		} catch (e) {
			console.log(e);
		}
	}

	static async deleteInterview(req: Request, res: Response): Promise<void> {
		const trainee = new TraineeProfileRecord(await TraineeProfileRecord.getTraineeProfileById(req.params.traineeId));

		if(trainee.status !== TraineeStatus.interviewed) {
			throw new ValidationError(interview.notInterviewed, 400)
		}

		try {
			await InterviewRecord.deleteInterviewByTraineeId(trainee.userId)
			await trainee.updateStatus(TraineeStatus.available)

			res
				.status(200)
				.json(jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee was successfully delete from interview.'
				}))
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	InterviewController
}
