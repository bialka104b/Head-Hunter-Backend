import { FieldPacket } from 'mysql2';
import { UserRole } from './user';

export type UserLoginResponseFromDatabase = [
	{
		id: string,
		email: string,
		password: string,
		role: UserRole,
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
