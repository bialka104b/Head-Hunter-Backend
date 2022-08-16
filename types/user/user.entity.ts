import { UserRole } from './user';

export interface UserEntity {
	id?: string;
	email: string;
	name?: string;
	password: string;
	role: UserRole;
	currentTokenId?: string;
	createdAt?: Date;
	isActive?: boolean;
}
