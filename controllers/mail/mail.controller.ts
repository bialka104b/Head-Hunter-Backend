import { Request, Response } from 'express';
import { MailRecord } from '../../records/mail/mail.record';
import { sendRegisterMail } from '../../mailService/sendMail';
import { jsonResponse } from '../../utils/jsonResponse';
import { JsonResponseStatus } from '../../types/api/json-response';
import { ValidationError } from '../../utils/ValidationError';

export class MailController {
	static async registerMail(req: Request, res: Response) {
		try {
			const unregisterUsers = await MailRecord.findUnregisterUsers();

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
			throw new ValidationError(e.message, e.code);
		}
	}
}
