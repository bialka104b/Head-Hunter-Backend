import {
	TraineeScoreEntity,
} from '../../../../types/trainee-score/trainee-score.entity';
import { faker } from '@faker-js/faker';
import { getRandomNumber } from './utils/getRandomIncludes';

export const generateTraineeScores = (amount: number): TraineeScoreEntity[] => {
	const traineeScoresArr = [];
	for (let i = 0; i < amount; i++) {
		const traineeScore = {
			id: `ts${i + 1}`,
			courseCompletion: getRandomNumber(1, 5),
			courseEngagment: getRandomNumber(1, 5),
			projectDegree: getRandomNumber(1, 5),
			teamProjectDegree: getRandomNumber(1, 5),
			bonusProjectUrls: [faker.internet.url(), faker.internet.url()],
			userId: `trainee${i + 1}`,
		};
		traineeScoresArr.push(traineeScore);
	}
	return traineeScoresArr;
};
