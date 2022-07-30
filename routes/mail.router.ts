import { Router } from 'express';
import { MailController } from '../controllers/mail/mail.controller';

export const mailRouter = Router();

mailRouter
	.get('/register', MailController.registerMail);
