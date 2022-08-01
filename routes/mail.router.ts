import { Router } from 'express';
import passport from 'passport';
import { MailController } from '../controllers/mail/mail.controller';

export const mailRouter = Router();

mailRouter
	.get('/register', passport.authenticate('jwt', { session: false }), MailController.registerMail);
