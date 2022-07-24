import {JwtPayload, sign} from "jsonwebtoken";
import {
	UserLoginResultsResponse,
	UserLoginRequest,
	UserLoginResponseFromDatabase,
} from "../types/user/user";
import {pool} from "../db/pool";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {config} from "../config/config";


export class AuthRecord implements UserLoginRequest {
	email: string;
	password: string;

	constructor(obj: UserLoginRequest) {
		if (!obj.email.includes("@")) {
			throw new Error("Email must includes the @ sign.");
		}
		this.email = obj.email;
		this.password = obj.password;
	}

	static async findTokenId(currentTokenId: string): Promise<{ currentTokenId: string } | null> {
		const [result] = await pool.execute("SELECT `currentTokenId` FROM `users` WHERE `currentTokenId` = :currentTokenId", {
			currentTokenId
		}) as [{ currentTokenId: string }[], FieldPacket[]];

		return result.length === 0 ? null : result[0];
	}

	protected async createToken(currentTokenId: string): Promise<string> {
		const payload: JwtPayload = {currentTokenId: currentTokenId};

		return sign(payload, config.jwt.passportSecretOrKey, {expiresIn: 60 * 60 * 24});
	}

	protected async generateToken(userId: string): Promise<string> {
		let token;
		let userWithThisToken = null;
		do {
			token = uuid();
			userWithThisToken = await AuthRecord.findTokenId(token);
		} while (!!userWithThisToken);
		await pool.execute("UPDATE `users` SET `currentTokenId` = :token WHERE `id` = :id ", {
			token,
			id: userId
		});

		return token;
	}

	static async logout(id: string) {
		await pool.execute("UPDATE `users` SET `currentTokenId` = NULL WHERE `id` = :id ", {
			id
		});
	}

	async login(): Promise<UserLoginResultsResponse> {

		const [result] = await pool.execute("SELECT `id`,`email`, `password`, `currentTokenId`, `role` FROM `users` WHERE `email` = :email AND `isActive` = :isActive", {
			email: this.email,
			isActive: true,
		}) as UserLoginResponseFromDatabase;

		if (!result[0]) {
			return {
				isLogin: false,
				message: "Not User Found. Possible that your status is non active."
			};
		}

		//TODO create task to create hash function for password
		if (result[0].password !== this.password) {
			return {
				isLogin: false,
				message: "Bad Password"
			};
		}

		const token = await this.createToken(await this.generateToken(result[0].id));

		return {
			isLogin: true,
			token,
			role: result[0].role
		};
	}
}
