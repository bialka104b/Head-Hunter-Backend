import * as nodemailer from 'nodemailer';
import { registerEmail } from './template/registerTemplate';
import { config } from '../config/config';
import { ValidationError } from '../utils/ValidationError';

const { incorrectEmail } = ValidationError.messages.recordInstanceInit.user;

const client = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.email.email,
		pass: config.email.pass,
	},
});

export const sendRegisterMail = async (email: string, userId: string, registerToken: string) => {

	const { from, html, subject } = registerEmail;

	if (!email.includes('@')) {
		throw new ValidationError(incorrectEmail, 400);
	}

	await client.sendMail({
		from,
		to: email,
		subject,
		html: html(userId, registerToken),
	});
};
