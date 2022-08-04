import { UserEntity } from '../../../../types/user/user.entity';
import { UserRole } from '../../../../types/user/user';

export const users: UserEntity[] = [
	{
		id: 'u1',
		email: 'rodion.raskolnikov@gmail.com',
		role: UserRole.admin,
		password: '782c3d9e9d9a5282f4da63681a9d7d064cb19b7fd8449ee62d8c52aac56e44ea936ae0436799a64fcae86711f84dbec58910dd8340d97309b3b6ce0727ad5b5c',
	},
	{
		id: 'u2',
		email: 's.emyonovna@gmail.com',
		role: UserRole.hr,
		password: '782c3d9e9d9a5282f4da63681a9d7d064cb19b7fd8449ee62d8c52aac56e44ea936ae0436799a64fcae86711f84dbec58910dd8340d97309b3b6ce0727ad5b5c',
	},
	{
		id: 'u3',
		email: 'a.romanovna@gmail.com',
		role: UserRole.trainee,
		password: '782c3d9e9d9a5282f4da63681a9d7d064cb19b7fd8449ee62d8c52aac56e44ea936ae0436799a64fcae86711f84dbec58910dd8340d97309b3b6ce0727ad5b5c',
	},
	{
		id: 'u4',
		email: 'a.svidrigailov@gmail.com',
		role: UserRole.trainee,
		password: '782c3d9e9d9a5282f4da63681a9d7d064cb19b7fd8449ee62d8c52aac56e44ea936ae0436799a64fcae86711f84dbec58910dd8340d97309b3b6ce0727ad5b5c',
	},
];
