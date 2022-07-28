import { Router } from 'express';
import { AuthRecord } from '../records/auth/auth.record';

export const authRouter = Router();

authRouter
	.post('/login', async (req, res) => {
		const user = new AuthRecord(req.body);
		const login = await user.login();

		res
			.cookie('jwt', login.token, {
				secure: true,
				domain: 'localhost',
				httpOnly: true,
				maxAge: 60 * 60 * 24,
			})
			.json(login);
	})
	.get('/logout', async (req, res) => {
		const jwtToken = req.cookies.jwt
		await AuthRecord.logout(jwtToken)

		res.clearCookie('jwt')
			.json({ isLogout: true });
	});
