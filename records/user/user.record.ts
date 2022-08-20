import { FieldPacket } from 'mysql2';
import { UserEntity, UserRole, UnregisterUsersResponse } from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import { pool } from '../../db/pool';
import { v4 as uuid } from 'uuid';
import {
	deleteUserById,
	findUserByEmail,
	getAllUsers,
	getUserById,
	insertMe,
	unregisterUsers,
	updateMe,
	updatePassword,
} from './sql';
import { hashPassword } from '../../utils/hashPassword';

const {
	incorrectEmail,
	incorrectPassword,
	incorrectRole,
} = ValidationError.messages.recordInstanceInit.user;

type DbResult = [UserRecord[], FieldPacket[]];
type DbUnregisterUsersResponse = [UnregisterUsersResponse[],  FieldPacket[]];

export class UserRecord implements UserEntity {
	id: string;
	email: string;
	name: string;
	avatar: string;
	password: string;
	role: UserRole;
	currentTokenId: string;
	registerToken: string;
	createdAt: Date;
	isActive: boolean;

	constructor(obj: UserEntity) {
		this.id = obj.id ?? uuid();
		this.email = obj.email;
		this.name = obj.email;
		this.password = obj.password;
		this.role = obj.role;
		this.currentTokenId = obj.currentTokenId ?? '';
		this.registerToken = obj.registerToken ?? uuid();
		this.createdAt = obj.createdAt ?? new Date();
		this.isActive = obj.isActive ?? true;
		this.validate();
	}

	//dynamic:
	private validate() {
		if (!this.email || !this.email.includes('@')) {
			throw new ValidationError(incorrectEmail, 400);
		}

		if (!this.password || this.password.length < 6) {
			throw new ValidationError(incorrectPassword, 400);
		}

		if (!this.role || !Object.values(UserRole).includes(this.role)) {
			throw new ValidationError(incorrectRole, 400);
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
				password: hashPassword(password),
				role,
				currentTokenId,
				createdAt,
				isActive,
			},
		);
		return id;
	}

	/*Function doesn't include password change to avoid hashing previous password if it is not changed. */
	async updateMe(): Promise<string> {
		const {
			id,
			email,
			role,
			currentTokenId,
		} = this;

		await pool.execute(
			updateMe, {
				id,
				email,
				role,
				currentTokenId,
			},
		);
		return id;
	}

	async updatePassword() {
		const { id, password } = this;
		await pool.execute(updatePassword, {
				id,
				password: hashPassword(password),
			},
		);
	}

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

	static async findUnregisterUsers(): Promise<UnregisterUsersResponse[]> {
		const [result] = await pool.execute(unregisterUsers) as DbUnregisterUsersResponse;

		return result.length === 0 ? null : result;
	}
}
