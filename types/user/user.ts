import {FieldPacket} from "mysql2";

export interface UserLoginRequest {
	email: string;
	password: string;
}

enum Role {
	admin = "admin",
	hr = "hr",
	trainee = "trainee"
}

export type UserLoginResponseFromDatabase = [
	{
		id: string,
		email: string,
		password: string,
		role: Role,
		currentTokenId: string,
	}[],
	FieldPacket[]
];

export type UserLoginResultsResponse = {
	isLogin: boolean,
	token?: string,
	role?: string,
	message?: string,
}
