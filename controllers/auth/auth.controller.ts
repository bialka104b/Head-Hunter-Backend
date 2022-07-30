import { Request, Response } from 'express';
import { AuthRecord } from '../../records/auth/auth.record';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus } from '../../types/api/json-response';

export class AuthController {
	static async login(req: Request, res: Response) {
		try {
			const user = new AuthRecord(req.body);
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
					},
				});
			}

			res
				.cookie('jwt', login.token, {
					secure: true,
					domain: 'localhost',
					httpOnly: true,
					maxAge: 60 * 60 * 24,
				})
				.json(response);
		} catch (e) {
			console.log(e);
		}
	}

	static async logout(req: Request, res: Response) {
		try {
			const jwtToken = req.cookies.jwt;
			await AuthRecord.logout(jwtToken);

			res.clearCookie('jwt');
		} catch (e) {
			console.log(e);
		}
	}
}
