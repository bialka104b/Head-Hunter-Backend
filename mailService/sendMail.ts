import * as nodemailer from 'nodemailer';
import { registerEmail } from './template/registerTemplate';
import { forgotPasswordMail } from './template/forgotPasswordTemplate';
import { config } from '../config/config';
import { ValidationError } from '../utils/ValidationError';
import { approveHire } from './template/approveHire';
import { hireInformation } from './template/hireInformation';
import { adminApproveHireInformation } from './template/adminApproveHireInformation';

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

export const sendResetPasswordMail = async (email: string, randomPassword: string) => {

	const { from, html, subject } = forgotPasswordMail;

	if (!email.includes('@')) {
		throw new ValidationError(incorrectEmail, 400);
	}

	await client.sendMail({
		from,
		to: email,
		subject,
		html: html(randomPassword),
	});
};

export const sendApproveHireMail = async (email: string, hrName: string) => {

	const { from, html, subject } = approveHire;

	if (!email.includes('@')) {
		throw new ValidationError(incorrectEmail, 400);
	}

	await client.sendMail({
		from,
		to: email,
		subject,
		html: html(hrName),
	});
};

export const sendHireInformationMail = async (email: string, firstname: string, lastname: string, hrFullName: string) => {

	const { from, html, subject } = hireInformation;

	if (!email.includes('@')) {
		throw new ValidationError(incorrectEmail, 400);
	}

	await client.sendMail({
		from,
		to: email,
		subject,
		html: html(firstname, lastname, hrFullName),
	});
};

export const sendAdminApproveHireInformationMail = async (email: string, firstname: string, lastname: string) => {

	const { from, html, subject } = adminApproveHireInformation;

	if (!email.includes('@')) {
		throw new ValidationError(incorrectEmail, 400);
	}

	await client.sendMail({
		from,
		to: email,
		subject,
		html: html(firstname, lastname),
	});
};
