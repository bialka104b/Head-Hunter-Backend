import { InterviewEntity } from '../../../../types/interview/interview.entity';
import { faker } from '@faker-js/faker';

export const generateInterviews = (amount: number): InterviewEntity[] => {
	const interviewArr = [];
	for (let i = 0; i < amount; i++) {
		const interview = {
			id: `i${i + 1}`,
			hrId: `hr${i + 1}`,
			traineeId: `trainee${i + 1}`,
			scheduledFor: new Date(faker.date.soon(7)),
		};
		interviewArr.push(interview);
	}
	return interviewArr;
};
