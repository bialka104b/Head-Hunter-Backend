import { FieldPacket } from 'mysql2';
import { UserEntity } from '../../types/user/user.entity';
import { UserRole } from '../../types/user/user';
import { hash } from 'bcrypt';
import {
	deleteUserById,
	findUserByEmail,
	getAllUsers,
	getUserById,
	insertMe,
} from './sql';
import { pool } from '../../db/pool';
import { v4 as uuid } from 'uuid';
import { ValidationError } from '../../utils/ValidationError';

type DbResult = [UserRecord[], FieldPacket[]];

export class UserRecord implements UserEntity {
	id: string;
	email: string;
	password: string;
	role: UserRole;
	currentTokenId: string;
	createdAt: Date;
	isActive: boolean;

	constructor(obj: UserEntity) {
		this.id = obj.id ?? uuid();
		this.email = obj.email;
		this.password = obj.password;
		this.role = obj.role;
		this.currentTokenId = obj.currentTokenId ?? '';
		this.createdAt = obj.createdAt ?? new Date();
		this.isActive = obj.isActive ?? true;
		this.validate();
	}

	//dynamic:
	private validate() {
		if (!this.email || !this.email.includes('@')) {
			throw new ValidationError(ValidationError.messages.userRecordInstanceInit.incorrectEmail, 400);
		}

		if (!this.password || this.password.length < 6) {
			throw new ValidationError('', 400);
		}

		if (!this.role || !Object.values(UserRole).includes(this.role)) {
			throw new ValidationError(ValidationError.messages.userRecordInstanceInit.incorrectRole, 400);
		}
	}

	async insertMe(): Promise<string> {
		const {
			id,
			email,
			password,
			role,
			currentTokenId,
			createdAt,
			isActive,
		} = this;

		await pool.execute(insertMe, {
				id,
				email,
				password: await hash(password, 12),
				role,
				currentTokenId,
				createdAt,
				isActive,
			},
		);
		return id;
	}

	//IN PROCESS:
	async updateMe(): Promise<string> {
		const {
			id,
			email,
			password,
			role,
			currentTokenId,
			createdAt,
			isActive,
		} = this;

		await pool.execute(insertMe, {
				id,
				email,
				password: await hash(password, 12),
				role,
				currentTokenId,
				createdAt,
				isActive,
			},
		);
		return id;
	}

	//-GET ALL USERS - ✔
	//-GET USER BY ID - ✔
	//-DELETE USER - ✔;
	//-FIND USER BY NAME/EMAIL - ✔;
	//-UPDATE USER -

	//static:
	static async getAllUsers(): Promise<UserRecord[] | null> {
		const resp = (await pool.execute(getAllUsers) as DbResult)[0];
		return resp.length !== 0 ? resp.map(el => new UserRecord(el)) : null;
	}

	static async getUserById(id: string): Promise<UserRecord | null> {
		const [resp] = (await pool.execute(getUserById, { id }) as DbResult)[0];
		return resp ? new UserRecord(resp) : null;
	}

	static async findUserByEmail(email: string): Promise<UserRecord | null> {
		const [resp] = (await pool.execute(findUserByEmail, { email }) as DbResult)[0];

		return resp ? new UserRecord(resp) : null;
	}

	static async deleteUserById(id: string): Promise<void> {
		await pool.execute(deleteUserById, { id });
	}
}
