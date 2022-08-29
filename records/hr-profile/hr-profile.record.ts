import { HrProfileEntity } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { pool } from '../../db/pool';
import {
	getAllHrProfiles,
	getCountOfHrProfiles,
	getHrMaxReservedStudentsInfo,
	getHrProfileById,
	getHrProfiles,
	insertMe,
	updateHr,
} from './sql';

const { incorrectRelationId, incorrectNameOrCompany } =
	ValidationError.messages.recordInstanceInit.hrProfile;

type DbResult = [HrProfileRecord[], FieldPacket[]];
type DBResultCountOfHr = [{ count: number }[], FieldPacket[]];
type DBResultHrMaxReservedStudentsInfo = [
	{ maxReservedStudents: number }[],
	FieldPacket[],
];

export class HrProfileRecord implements HrProfileEntity {
	id: string;
	email: string;
	fullName: string;
	company: string;
	maxReservedStudents: number;
	userId: string;
	createdAt: Date;

	constructor(obj: HrProfileEntity) {
		this.id = obj.id ?? uuid();
		this.fullName = obj.fullName;
		this.email = obj.email;
		this.company = obj.company;
		this.maxReservedStudents = obj.maxReservedStudents ?? 1;
		this.userId = obj.userId;
		this.createdAt = obj.createdAt ?? new Date();
		this.validate();
	}

	//static:
	static async getAllHrProfiles() {
		const resp = ((await pool.execute(getAllHrProfiles)) as DbResult)[0];
		return resp.length !== 0
			? resp.map((el) => new HrProfileRecord(el))
			: null;
	}

	static async getCountOfHr(): Promise<number | null> {
		const [resp] = (
			(await pool.execute(getCountOfHrProfiles)) as DBResultCountOfHr
		)[0];
		return resp.count ?? null;
	}

	static async getHrList(limit: number, offsetElement: number) {
		const resp = (
			(await pool.execute(getHrProfiles, {
				limit: limit.toString(),
				offsetElement: offsetElement.toString(),
			})) as DbResult
		)[0];
		return resp.length !== 0
			? resp.map((el) => new HrProfileRecord(el))
			: [];
	}

	static async getHrProfileById(id: string): Promise<HrProfileRecord | null> {
		const [resp] = (
			(await pool.execute(getHrProfileById, { id })) as DbResult
		)[0];
		return resp ? new HrProfileRecord(resp) : null;
	}

	static async getHrMaxReservedStudentsInfo(
		id: string,
	): Promise<number | null> {
		const [resp] = (
			(await pool.execute(getHrMaxReservedStudentsInfo, {
				id,
			})) as DBResultHrMaxReservedStudentsInfo
		)[0];
		return resp.maxReservedStudents ?? null;
	}

	static async updateMaxReservedStudents(
		userId: string,
		maxReservedStudents: number,
	): Promise<void> {
		await pool.execute(updateHr, {
			maxReservedStudents,
			userId,
		});
	}

	//dynamic:
	async insertMe(): Promise<string> {
		const {
			id,
			fullName,
			company,
			maxReservedStudents,
			userId,
			createdAt,
		} = this;
		await pool.execute(insertMe, {
			id,
			fullName,
			company,
			maxReservedStudents,
			userId,
			createdAt,
		});
		return id;
	}

	private validate() {
		if (!this.fullName || !this.company) {
			throw new ValidationError(incorrectNameOrCompany, 400);
		} else if (!this.userId) {
			console.log(this.userId);
			throw new ValidationError(incorrectRelationId, 400);
		}
	}
}
