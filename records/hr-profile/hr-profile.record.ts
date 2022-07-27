import { HrProfileEntity } from '../../types/hr-profile/hr-profile.entity';
import { ValidationError } from '../../utils/ValidationError';
import { v4 as uuid } from 'uuid';
import { pool } from '../../db/pool';
import { FieldPacket } from 'mysql2';
import {
	deleteHrProfileById,
	getAllHrProfiles,
	getHrProfileById,
	insertMe,
    updateMe,
} from './sql';

const {
	incorrectRelationId,
	incorrectNameOrCompany,
} = ValidationError.messages.recordInstanceInit.hrProfile;

type DbResult = [HrProfileRecord[], FieldPacket[]];


export class HrProfileRecord implements HrProfileEntity {
	id: string;
	fullName: string;
	company: string;
	maxReservedStudents: number;
	userId: string;
	createdAt: Date;

	constructor(obj: HrProfileEntity) {
		this.id = obj.id ?? uuid();
		this.fullName = obj.fullName;
		this.company = obj.company;
		this.maxReservedStudents = obj.maxReservedStudents ?? 1;
		this.userId = obj.userId;
		this.createdAt = obj.createdAt ?? new Date();
		this.validate();
	}

	private validate() {
		if (!this.fullName || !this.company) {
			throw new ValidationError(incorrectNameOrCompany, 400);

		} else if (!this.userId) {
			console.log(this.userId);
			throw new ValidationError(incorrectRelationId, 400);
		}
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
		await pool.execute(insertMe,
			{
				id,
				fullName,
				company,
				maxReservedStudents,
				userId,
				createdAt,
			});
		return id;
	}

	async updateMe(): Promise<string> {
		const {
			id,
			fullName,
			company,
			maxReservedStudents,
			userId,
		} = this;

		await pool.execute(updateMe, {
			id,
			fullName,
			company,
			maxReservedStudents,
			userId,
		});

		return id;
	}

	//static:
	static async getAllHrProfiles() {
		const resp = (await pool.execute(getAllHrProfiles) as DbResult)[0];
		return resp.length !== 0 ? resp.map(el => new HrProfileRecord(el)) : null;
	}

	static async getHrProfileById(id: string): Promise<HrProfileRecord | null> {
		const [resp] = (await pool.execute(getHrProfileById, { id }) as DbResult)[0];
		return resp ? new HrProfileRecord(resp) : null;
	}

	static async deleteHrProfileById(id: string): Promise<void> {
		await pool.execute(deleteHrProfileById, { id });
	}
}
