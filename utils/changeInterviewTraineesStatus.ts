import { InterviewRecord } from '../records/interview/interview.record';
import { TraineeStatus } from '../types';
import { TraineeProfileRecord } from '../records/trainee-profie/trainee-profile.record';

const tenDays = 1000 * 60 * 60 * 24 * 10;
const everyEightHours = 1000 * 60 * 60 * 8;

export const changeInterviewTraineesStatus = () => setInterval(async () => {
	const interviews = await InterviewRecord.getAllInterviews();
	const afterTimeInterviewTrainees = interviews.filter(trainees => Date.parse(String(trainees.createdAt)) + tenDays < Date.parse(String(new Date())));

	if (afterTimeInterviewTrainees.length > 0) {
		for (const traineeInterviews of afterTimeInterviewTrainees) {
			const trainee = new TraineeProfileRecord(await TraineeProfileRecord.getTraineeProfileById(traineeInterviews.traineeId));
			await InterviewRecord.deleteInterviewByTraineeId(trainee.userId);
			await trainee.updateStatus(TraineeStatus.available);
		}
	}

}, everyEightHours);
