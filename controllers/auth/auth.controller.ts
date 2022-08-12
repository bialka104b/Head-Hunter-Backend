import { Request, Response } from 'express';
import { AuthRecord } from '../../records/auth/auth.record';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus } from '../../types';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { hashPassword } from '../../utils/hashPassword';

const {notAuthorised, incorrectPassword, passwordIsTheSame} = ValidationError.messages.auth

class AuthController {
	static async login(req: Request, res: Response) {
		const user = new AuthRecord(req.body);

		try {
			const login = await user.login();

			let response;

			if (!login.isLogin) {
				response = jsonResponse({
					code: 400,
					status: JsonResponseStatus.failed,
					message: login.message,
				});
			} else {
				response = jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: login.message,
					data: {
						token: login.token,
						role: login.role,
						id: login.id,
					},
				});
			}

			res.cookie('jwt', login.token, {
				secure: true,
				domain: 'localhost',
				httpOnly: true,
				maxAge: 1000 * 60 * 60,
			}).json(response);
		} catch (e) {
			console.log(e);
		}
	}

	static async logout(req: Request, res: Response) {
		const { id } = req.user as UserRecord;

		try {
			await AuthRecord.logout(id);

			res.status(200)
				.clearCookie('jwt')
				.json(
					jsonResponse({
						code: 200,
						status: JsonResponseStatus.success,
						message: 'You are logout.',
					}),
				);
		} catch (e) {
			console.log(e);
		}
	}

	static async changePassword(req: Request, res: Response) {
		const {id, oldPassword, newPassword} = req.body

		const user = await UserRecord.getUserById(id)
		const loginUSer = req.user as UserRecord

		if(user.id !== loginUSer.id) {
			throw new ValidationError(notAuthorised, 400)
		}

		if(hashPassword(newPassword) === user.password || oldPassword === newPassword) {
			throw new ValidationError(passwordIsTheSame, 400)
		}

		if(user.password !== hashPassword(oldPassword)) {
			throw new ValidationError(incorrectPassword, 400)
		}

		try {

			await AuthRecord.changePassword(id, newPassword)

			res.status(200)
				.clearCookie('jwt')
				.json(
					jsonResponse({
						code: 200,
						status: JsonResponseStatus.success,
						message: 'You are logout.',
						data: {
							user: user,
							newPassword,
						},
					}),
				);
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	AuthController,
};
