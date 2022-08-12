import { TraineeScoreEntity } from '../../../../types/trainee-score/trainee-score.entity';

export const traineeScores: TraineeScoreEntity[] = [
	{
		id: 'ts1',
		courseCompletion: 4.3,
		courseEngagment: 5,
		projectDegree: 4.5,
		teamProjectDegree: 5,
		bonusProjectUrls: ['https://github.com', 'https://github.com'],
		userId: 'u3',
	},
	{
		id: 'ts2',
		courseCompletion: 3.5,
		courseEngagment: 2.8,
		projectDegree: 4,
		teamProjectDegree: 3.4,
		bonusProjectUrls: ['https://github.com'],
		userId: 'u4',
	},
];
