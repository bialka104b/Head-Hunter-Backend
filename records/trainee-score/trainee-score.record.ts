import {
	TraineeScoreEntity,
} from '../../types/trainee-score/trainee-score.entity';
import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { pool } from '../../db/pool';
import {
	getAllTraineeScore,
	getTraineeScoreById,
	insertMe,
	updateMe,
} from './sql';
import { ValidationError } from '../../utils/ValidationError';

type DbResult = [TraineeScoreRecord[], FieldPacket[]];

const { incorrectScore } = ValidationError.messages.recordInstanceInit.traineeScore;

export class TraineeScoreRecord implements TraineeScoreEntity {
	id: string;
	courseCompletion: number;
	courseEngagment: number;
	projectDegree: number;
	teamProjectDegree: number;
	bonusProjectUrls: string[];
	userId: string | null;
	createdAt: Date;

	constructor(obj: TraineeScoreEntity) {
		this.id = obj.id ?? uuid();
		this.courseCompletion = obj.courseCompletion;
		this.courseEngagment = obj.courseEngagment;
		this.projectDegree = obj.projectDegree;
		this.teamProjectDegree = obj.teamProjectDegree;
		this.bonusProjectUrls = obj.bonusProjectUrls;
		this.userId = obj.userId ?? null;
		this.createdAt = obj.createdAt ?? new Date();
		this.validation();
	}

	private validation() {
		const {
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
		} = this;
		if (
			(courseCompletion < 0 || courseCompletion > 5) ||
			(courseEngagment < 0 || courseEngagment > 5) ||
			(projectDegree < 0 || projectDegree > 5) ||
			(teamProjectDegree < 0 || teamProjectDegree > 5)
		) {
			throw new ValidationError(incorrectScore, 400);
		}
	}

	//dynamic:
	async insertMe() {
		const {
			id,
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
			bonusProjectUrls,
			userId,
			createdAt,
		} = this;
		await pool.execute(insertMe, {
			id,
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
			bonusProjectUrls: JSON.stringify(bonusProjectUrls),
			userId,
			createdAt,
		});
		return id;
	}

	async updateMe() {
		const {
			id,
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
			bonusProjectUrls,
			userId,
			createdAt,
		} = this;
		await pool.execute(updateMe, {
			id,
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
			bonusProjectUrls: JSON.stringify(bonusProjectUrls),
			userId,
			createdAt,
		});
		return id;
	}

	//static:
	static async getAllTraineeScore(): Promise<TraineeScoreRecord[] | null> {
		const resp = (await pool.execute(getAllTraineeScore) as DbResult)[0];
		return resp.length !== 0 ? resp.map(el => new TraineeScoreRecord(el)) : null;
	}

	static async getTraineeScoreById(id: string): Promise<TraineeScoreRecord | null> {
		const [resp] = (await pool.execute(getTraineeScoreById, { id }) as DbResult)[0];
		return resp ? new TraineeScoreRecord(resp) : null;
	}
}
