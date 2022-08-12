import { JwtPayload, sign } from 'jsonwebtoken';
import { pool } from '../../db/pool';
import { config } from '../../config/config';
import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import {
	UserLoginRequest,
	UserLoginResultsResponse,
	UserLoginResponseFromDatabase,
} from '../../types';
import { ValidationError } from '../../utils/ValidationError';
import { findTokenId, generateToken, login, logout } from './sql';
import { hashPassword } from '../../utils/hashPassword';

const { incorrectData, incorrectEmail } = ValidationError.messages.login;

export class AuthRecord implements UserLoginRequest {
	email: string;
	password: string;

	constructor(obj: UserLoginRequest) {
		if (!obj.email.includes('@')) {
			throw new ValidationError(incorrectEmail, 400);
		}
		this.email = obj.email;
		this.password = obj.password;
	}

	//dynamic
	async login(): Promise<UserLoginResultsResponse> {

		const [result] = await pool.execute(login, {
			email: this.email,
			isActive: true,
		}) as UserLoginResponseFromDatabase;

		if (!result[0] || result[0].password !== hashPassword(this.password)) {
			return {
				isLogin: false,
				message: incorrectData,
			};
		}

		const token = await this.createToken(await this.generateToken(result[0].id));

		return {
			isLogin: true,
			id: result[0].id,
			token,
			role: result[0].role,
		};
	}

	protected async createToken(currentTokenId: string): Promise<string> {
		const payload: JwtPayload = { currentTokenId: currentTokenId };

		return sign(payload, config.jwt.passportSecretOrKey, { expiresIn: 60 * 60 * 24 });
	}

	protected async generateToken(userId: string): Promise<string> {
		let token;
		let userWithThisToken = null;
		do {
			token = uuid();
			userWithThisToken = await AuthRecord.findTokenId(token);
		} while (!!userWithThisToken);
		await pool.execute(generateToken, {
			token,
			id: userId,
		});

		return token;
	}

	//static
	static async findTokenId(currentTokenId: string): Promise<{ currentTokenId: string } | null> {
		const [result] = await pool.execute(findTokenId, {
			currentTokenId,
		}) as [{ currentTokenId: string }[], FieldPacket[]];

		return result.length === 0 ? null : result[0];
	}

	static async logout(id: string) {
		await pool.execute(logout, {
			id,
		});
	}
}
