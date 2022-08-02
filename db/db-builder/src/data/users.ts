import { UserEntity } from '../../../../types/user/user.entity';
import { UserRole } from '../../../../types/user/user';

export const users: UserEntity[] = [
	{
		id: 'u1',
		email: 'rodion.raskolnikov@gmail.com',
		role: UserRole.admin,
		password: 'test1234',
	},
	{
		id: 'u2',
		email: 's.emyonovna@gmail.com',
		role: UserRole.hr,
		password: 'test1234',
	},
	{
		id: 'u3',
		email: 'a.romanovna@gmail.com',
		role: UserRole.trainee,
		password: 'test1234',
	},
	{
		id: 'u4',
		email: 'a.svidrigailov@gmail.com',
		role: UserRole.trainee,
		password: 'test1234',
	},
];
