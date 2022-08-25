import { Request, Response } from 'express';
import { TraineeProfileRecord } from '../../records/trainee-profie/trainee-profile.record';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus, TraineeStatus, UserRole } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import { InterviewRecord } from '../../records/interview/interview.record';
import { UserRecord } from '../../records/user/user.record';
import { HrProfileRecord } from '../../records/hr-profile/hr-profile.record';

const { interview, auth } = ValidationError.messages;

class InterviewController {
	static async addInterview(req: Request, res: Response): Promise<void> {
		const trainee = await TraineeProfileRecord.getTraineeProfileById(
			req.params.traineeId,
		);

		if (trainee === null) {
			throw new ValidationError(interview.id, 400);
		}

		if (trainee.status === TraineeStatus.hired) {
			throw new ValidationError(interview.statusHired, 400);
		}

		const hr = req.user as UserRecord;

		if (hr.role !== UserRole.hr) {
			throw new ValidationError(auth.notAuthorised, 400);
		}

		const hrMaxReservedStudents =
			await HrProfileRecord.getHrMaxReservedStudentsInfo(hr.id);
		const countOfInterviewByHr =
			await InterviewRecord.getCountOfTraineesInterviewsForHr(hr.id);

		if (hrMaxReservedStudents <= countOfInterviewByHr) {
			throw new ValidationError(interview.hrMaxReservedStudents, 400);
		}

		try {
			const interview = new InterviewRecord({
				hrId: hr.id,
				traineeId: trainee.userId,
			});

			await interview.insertMe();

			await trainee.updateStatus(TraineeStatus.interviewed);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Trainee successfully added to interview.',
					data: {
						id: interview.id,
						date: interview.createdAt,
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async deleteInterview(req: Request, res: Response): Promise<void> {
		const { hrId, traineeId } = req.body;
		const trainee = await TraineeProfileRecord.getTraineeProfileById(
			traineeId,
		);

		if (trainee === null) {
			throw new ValidationError(interview.id, 400);
		}

		const { role, id } = req.user as UserRecord;

		if (role === UserRole.trainee) {
			if (traineeId !== id) {
				throw new ValidationError(auth.notAuthorised, 400);
			}
		}

		try {
			await InterviewRecord.deleteInterviewByTraineeId(hrId, traineeId);
			const traineeInterviews =
				await InterviewRecord.getInterviewByTraineeId(traineeId);

			if (traineeInterviews === null) {
				const traineeProfile = new TraineeProfileRecord(trainee);

				await traineeProfile.updateStatus(TraineeStatus.available);
			}

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Interview was successfully delete.',
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}
}

export { InterviewController };
