import {
	TraineeScoreEntity,
} from '../../types/trainee-score/trainee-score.entity';
import { v4 as uuid } from 'uuid';

export class TraineeScoreRecord implements TraineeScoreEntity {
	id: string;
	courseCompletion: number;
	courseEngagment: number;
	projectDegree: number;
	teamProjectDegree: number;
	bonusProjectUrls: string;
	userId: string;
	createdAt: Date;

	constructor(obj: TraineeScoreEntity) {
		this.id = obj.id ?? uuid();
		this.courseCompletion = obj.courseCompletion;
		this.courseEngagment = obj.courseEngagment;
		this.projectDegree = obj.projectDegree;
		this.teamProjectDegree = obj.teamProjectDegree;
		this.bonusProjectUrls = obj.bonusProjectUrls;
		this.userId = obj.userId;
		this.createdAt = obj.createdAt ?? new Date();
	}
}
