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
	.get('/logout/:id', async (req, res) => {
		const id = req.params.id;
		await AuthRecord.logout(id);

		res.clearCookie('jwt')
			.json({ isLogout: true });
	});
