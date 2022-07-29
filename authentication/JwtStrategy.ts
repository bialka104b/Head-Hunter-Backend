import { Strategy } from "passport-jwt";
import { Request } from "express";
const passport = require("passport");
import { pool } from "../db/pool";
import { FieldPacket } from "mysql2";
import { config } from "../config/config";
import { UserRecord } from '../records/user/user.record';

const cookieExtractor = function (req: Request): null | string {
	let token = null;
	if (req && req.cookies?.jwt) {
		token = req.cookies["jwt"];
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
			return done(new Error("unauthorized User"), false);
		}
		const [result] = (await pool.execute(
			"SELECT * FROM `users` WHERE `currentTokenId` = :currentTokenId",
			{
				currentTokenId: jwt_payload.currentTokenId,
			},
		)) as [UserRecord[], FieldPacket[]];

		if (!result[0]) {
			return done(new Error("nie ma usera"), false);
		}
		done(null, result[0]);
	},
);

passport.use(JwtStrategy);

//if you want to authorization a path you must to add a function: passport.authenticate('jwt', { session: false })
// fro example:
//app.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
// })