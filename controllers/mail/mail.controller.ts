import { Request, Response } from 'express';
import { sendRegisterMail } from '../../mailService/sendMail';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus } from '../../types';
import { UserRecord } from '../../records/user/user.record';

class MailController {
	static async registerMail(req: Request, res: Response) {
		try {
			const unregisterUsers = await UserRecord.findUnregisterUsers();

			for (const users of unregisterUsers) {
				const { id, email, registerToken } = users;
				await sendRegisterMail(email, id, registerToken);
			}

			res.json(jsonResponse({
				code: 200,
				status: JsonResponseStatus.success,
				message: 'done',
			}));
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	MailController,
};
