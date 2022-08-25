import { FieldPacket } from 'mysql2';
import { InterviewEntity, InterviewTraineesIdResponse } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import {
	insertMe,
	getAllInterviews,
	getInterviewById,
	deleteInterviewById,
	updateMe,
	getTraineesInterviewsListByHrId,
	getCountOfTraineesInterviewsForHr,
	deleteTraineeFromInterviewTable,
	setInterviewActive,
	getTraineesInterviewIfExists,
} from './sql';
import { pool } from '../../db/pool';
import { v4 as uuid } from 'uuid';

type DbResult = [InterviewRecord[], FieldPacket[]];
type DbResultTraineesInterviewsListByHrId = [
	InterviewTraineesIdResponse[],
	FieldPacket[],
];
type DBResultCountOfTraineesInterviewsForHr = [
	{ count: number }[],
	FieldPacket[],
];

const { incorrectRelationId } =
	ValidationError.messages.recordInstanceInit.interview;

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
		const { id, hrId, traineeId, scheduledFor } = this;
		await pool.execute(updateMe, {
			hrId,
			traineeId,
			scheduledFor,
		});
		return id;
	}

	async setInterviewActive(): Promise<string> {
		const { id } = this;
		await pool.execute(setInterviewActive, {
			id,
		});
		return id;
	}

	static async getTraineesInterviewIfExists(
		hrId: string,
		traineeId: string,
	): Promise<InterviewRecord | null> {
		const resp = (
			(await pool.execute(getTraineesInterviewIfExists, {
				hrId,
				traineeId,
			})) as DbResult
		)[0];
		return resp.length !== 0
			? resp.map((el) => new InterviewRecord(el))[0]
			: null;
	}

	//static:
	static async getAllInterviews(): Promise<InterviewRecord[] | null> {
		const resp = ((await pool.execute(getAllInterviews)) as DbResult)[0];
		return resp.length !== 0
			? resp.map((el) => new InterviewRecord(el))
			: null;
	}

	static async getInterviewByTraineeId(
		traineeId: string,
	): Promise<InterviewRecord | null> {
		const [resp] = (
			(await pool.execute(getInterviewById, { traineeId })) as DbResult
		)[0];
		return resp ? new InterviewRecord(resp) : null;
	}

	static async getInterviewsTraineeList(
		id: string,
		limit: number,
		offsetElement: number,
	) {
		const resp = (
			(await pool.execute(getTraineesInterviewsListByHrId, {
				id,
				limit,
				offsetElement,
			})) as DbResultTraineesInterviewsListByHrId
		)[0];
		return resp.length !== 0 ? resp : null;
	}

	static async deleteInterviewByTraineeId(
		hrId: string,
		traineeId: string,
	): Promise<void> {
		await pool.execute(deleteInterviewById, { hrId, traineeId });
	}
	static async deleteTraineeFromInterviewTable(
		traineeId: string,
	): Promise<void> {
		await pool.execute(deleteTraineeFromInterviewTable, { traineeId });
	}

	static async getCountOfTraineesInterviewsForHr(
		hrId: string,
	): Promise<number | null> {
		const [resp] = (
			(await pool.execute(getCountOfTraineesInterviewsForHr, {
				hrId,
			})) as DBResultCountOfTraineesInterviewsForHr
		)[0];
		return resp.count ?? null;
	}
}
