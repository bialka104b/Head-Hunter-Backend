import { FieldPacket } from 'mysql2';
import { InterviewEntity } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import {
	insertMe,
	getAllInterviews,
	getInterviewById,
	deleteInterviewById,
	updateMe,
	getTraineesInterviewsListByHrId,
} from './sql';
import { pool } from '../../db/pool';
import { v4 as uuid } from 'uuid';

type DbResult = [InterviewRecord[], FieldPacket[]];
type DbResultTraineesInterviewsListByHrId = [{traineeId: string}[], FieldPacket[]];

const { incorrectRelationId } = ValidationError.messages.recordInstanceInit.interview;

export class InterviewRecord implements InterviewEntity {
	id: string;
	hrId: string;
	traineeId: string;
	scheduledFor: Date;
	createdAt: Date;
	isActive: boolean;

	constructor(obj: InterviewEntity) {
		this.id = obj.id ?? uuid();
		this.hrId = obj.hrId;
		this.traineeId = obj.traineeId;
		this.scheduledFor = obj.scheduledFor ?? null;
		this.createdAt = obj.createdAt ?? new Date();
		this.isActive = obj.isActive ?? true;
		this.validate();
	}

	private validate() {
		if (!this.hrId || !this.traineeId) {
			throw new ValidationError(incorrectRelationId, 400);
		}
	}

	//dynamic:
	async insertMe(): Promise<string> {
		const { id, hrId, traineeId, scheduledFor, createdAt, isActive } = this;
		await pool.execute(insertMe, {
			id,
			hrId,
			traineeId,
			scheduledFor,
			createdAt,
			isActive,
		});
		return id;
	}

	async updateMe(): Promise<string> {
		const {
			id,
			hrId,
			traineeId,
			scheduledFor,
		} = this;
		await pool.execute(
			updateMe,
			{
				hrId,
				traineeId,
				scheduledFor,
			});
		return id;
	}

	//static:
	static async getAllInterviews(): Promise<InterviewRecord[] | null> {
		const resp = (await pool.execute(getAllInterviews) as DbResult)[0];
		return resp.length !== 0 ? resp.map(el => new InterviewRecord(el)) : null;
	}

	static async getInterviewById(id: string): Promise<InterviewRecord | null> {
		const [resp] = (await pool.execute(getInterviewById, { id }) as DbResult)[0];
		return resp ? new InterviewRecord(resp) : null;
	}

	static async getInterviewsTraineeList(id: string) {
		const [resp] = (await pool.execute(getTraineesInterviewsListByHrId, {id}) as DbResultTraineesInterviewsListByHrId);
		return resp ?? null
	}

	static async deleteInterviewById(id: string): Promise<void> {
		await pool.execute(deleteInterviewById, { id });
	}
}
