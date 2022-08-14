import { FieldPacket } from 'mysql2';
import { UserRole } from './user';

export type UserLoginResponseFromDatabase = [
	{
		id: string;
		email: string;
		password: string;
		role: UserRole;
		currentTokenId: string;
	}[],
	FieldPacket[],
];

export type UserLoginResultsResponse = {
	id?: string;
	isLogin: boolean;
	token?: string;
	role?: string;
	message?: string;
	name?: string;
};

export type UnregisterUsersResponse = {
	id: string;
	email: string;
	registerToken: string;
};

export type HrNameResponseFromDatabase = [
	{
		fullName: string;
	}[],
	FieldPacket[],
];

export type TraineeNameResponseFromDatabase = [
	{
		firstName: string;
		lastName: string;
	}[],
	FieldPacket[],
];
