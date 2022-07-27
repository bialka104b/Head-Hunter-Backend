export interface TraineeScoreEntity {
	id?: string;
	courseCompletion: number;
	courseEngagment: number;
	projectDegree: number;
	teamProjectDegree: number;
	bonusProjectUrls: string;
	userId: string;
	createdAt?: Date;
}
