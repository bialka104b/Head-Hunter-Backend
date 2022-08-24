import { Request, Response } from 'express';
import { AuthRecord } from '../../records/auth/auth.record';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus, UserEntity } from '../../types';
import { UserRecord } from '../../records/user/user.record';
import { ValidationError } from '../../utils/ValidationError';
import { hashPassword } from '../../utils/hashPassword';
import { getRandomPassword } from '../../utils/getRandomPassword';
import { sendResetPasswordMail } from '../../mailService/sendMail';

const {
	notAuthorised,
	incorrectPassword,
	passwordIsTheSame,
	incorrectEmail,
	userWithThatEmailNotExist,
	userWithThatIdNotExist,
	incorrectCreatePassword,
} = ValidationError.messages.auth;

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
						name: login.name,
						avatar: login.avatar,
					},
				});
			}

			res.cookie('jwt', login.token, {
				secure: true,
				domain: 'localhost',
				httpOnly: false,
				maxAge: 1000 * 60 * 60 * 4,
			}).json(response);
		} catch (e) {
			console.log(e);
		}
	}

	static async refresh(req: Request, res: Response) {
		const { role, id, name, avatar } = req.user as UserEntity;

		res.json(
			jsonResponse({
				code: 200,
				status: JsonResponseStatus.success,
				message: 'Auth informations refreshed',
				data: {
					token: req.cookies.jwt,
					role: role,
					id: id,
					name: name,
					avatar: avatar,
				},
			}),
		);
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
		const { id, oldPassword, newPassword } = req.body;

		const user = await UserRecord.getUserById(id);
		const loginUSer = req.user as UserRecord;

		if (user.id !== loginUSer.id) {
			throw new ValidationError(notAuthorised, 401);
		}

		if (
			hashPassword(newPassword) === user.password ||
			oldPassword === newPassword
		) {
			throw new ValidationError(passwordIsTheSame, 200);
		}

		if (user.password !== hashPassword(oldPassword)) {
			throw new ValidationError(incorrectPassword, 200);
		}

		try {
			await AuthRecord.changePassword(id, newPassword);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'You changed password.',
					data: {
						user: user.id,
					},
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async forgotPassword(req: Request, res: Response) {
		const { email } = req.body;

		if (!email.includes('@')) {
			throw new ValidationError(incorrectEmail, 200);
		}

		const findUserById = await UserRecord.findUserByEmail(email);

		if (!findUserById) {
			throw new ValidationError(userWithThatEmailNotExist, 200);
		}

		try {
			const user = new UserRecord(findUserById);

			const randomPassword = getRandomPassword();

			user.password = randomPassword;

			await user.updatePassword();

			await sendResetPasswordMail(user.email, randomPassword);

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Reset Password successfully.',
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}

	static async createPassword(req: Request, res: Response) {
		const { id, password } = req.body;

		const userById = await UserRecord.getInactiveUserById(id);

		if (!userById) {
			throw new ValidationError(userWithThatIdNotExist, 200);
		}

		if (password.length < 6) {
			throw new ValidationError(incorrectCreatePassword, 200);
		}

		try {
			const user = new UserRecord(userById);

			user.password = password;

			await user.updatePassword();
			await user.activate();

			res.status(200).json(
				jsonResponse({
					code: 200,
					status: JsonResponseStatus.success,
					message: 'Create Password successfully.',
				}),
			);
		} catch (e) {
			console.log(e);
		}
	}
}

export { AuthController };
