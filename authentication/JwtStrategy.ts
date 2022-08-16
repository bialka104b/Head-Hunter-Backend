import { Strategy } from 'passport-jwt';
import e, { Request } from 'express';
import { pool } from '../db/pool';
import { FieldPacket } from 'mysql2';
import { config } from '../config/config';
import { UserRecord } from '../records/user/user.record';
import { ValidationError } from '../utils/ValidationError';
import {
	HrNameResponseFromDatabase,
	TraineeNameResponseFromDatabase,
	UserRole,
} from '../types';
import { getHrName, getTraineeName } from '../records/auth/sql';

const { notAuthorised } = ValidationError.messages.auth;

const passport = require('passport');

const cookieExtractor = function (req: Request): null | string {
	let token = null;
	if (req && req.cookies?.jwt) {
		token = req.cookies['jwt'];
	}
	return token;
};

const opts = {
	jwtFromRequest: cookieExtractor,
	secretOrKey: config.jwt.passportSecretOrKey,
	expiresIn: 60 * 60 * 24,
};

export const JwtStrategy = new Strategy(
	opts,
	async (
		jwt_payload,
		done: (error: Error | null, user: UserRecord | boolean) => void,
	) => {
		if (!jwt_payload || !jwt_payload.currentTokenId) {
			return done(new ValidationError(notAuthorised, 400), false);
		}
		const [result] = (await pool.execute(
			'SELECT * FROM `users` WHERE `currentTokenId` = :currentTokenId',
			{
				currentTokenId: jwt_payload.currentTokenId,
			},
		)) as [UserRecord[], FieldPacket[]];

		if (!result[0]) {
			return done(new ValidationError(notAuthorised, 400), false);
		}

		const { role, email, id } = result[0];

		let name = '';
		if (role === UserRole.admin) name = 'Admin';
		else {
			try {
				if (role === UserRole.hr) {
					const [hrResult] = (await pool.execute(getHrName, {
						userId: id,
					})) as HrNameResponseFromDatabase;
					name =
						hrResult[0] === null || !hrResult[0].fullName
							? email
							: hrResult[0].fullName;
				}
				if (role === UserRole.trainee) {
					const [traineeResult] = (await pool.execute(
						getTraineeName,
						{
							userId: id,
						},
					)) as TraineeNameResponseFromDatabase;
					let fullName = '';
					const firstName =
						traineeResult[0] === null || !traineeResult[0].firstName
							? ''
							: traineeResult[0].firstName;
					const lastName =
						traineeResult[0] === null || !traineeResult[0].lastName
							? ''
							: traineeResult[0].lastName;
					fullName =
						firstName === '' && lastName === ''
							? email
							: firstName + ' ' + lastName;
					name = fullName;
				}
			} catch (e) {
				name = email;
			}
		}

		result[0].name = name;
		done(null, result[0]);
	},
);

passport.use(JwtStrategy);

//if you want to authorization a path you must to add a function: passport.authenticate('jwt', { session: false })
// fro example:
//app.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
// })
