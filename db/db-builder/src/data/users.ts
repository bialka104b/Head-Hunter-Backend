import { UserEntity } from '../../../../types/user/user.entity';
import { UserRole } from '../../../../types/user/user';
import { faker } from '@faker-js/faker';
import { hashedPassword } from './utils/hashedPassword';

const generateAdmin = (): UserEntity => {
	return {
		id: 'admin1',
		email: 'admin@admin.admin',
		role: UserRole.admin,
		password: hashedPassword,
	};
};

const generateHrs = (amount: number): UserEntity[] => {
	const hrsArr = [];
	for (let i = 0; i < amount; i++) {
		const hr = {
			id: `hr${i + 1}`,
			email: faker.internet.email(),
			role: UserRole.hr,
			password: hashedPassword,
		};
		hrsArr.push(hr);
	}
	return hrsArr;
};

const generateTrainees = (amount: number): UserEntity[] => {
	const hrsArr = [];
	for (let i = 0; i < amount; i++) {
		const trainee = {
			id: `trainee${i + 1}`,
			email: faker.internet.email(),
			role: UserRole.trainee,
			password: hashedPassword,
		};
		hrsArr.push(trainee);
	}
	return hrsArr;
};

const generateUsers = (hrsAmount: number, traineesAmount: number): UserEntity[] => {
	const admin = generateAdmin();
	const hrsArr = generateHrs(hrsAmount);
	const traineesArr = generateTrainees(traineesAmount);
	return [
		admin,
		...hrsArr,
		...traineesArr,
	];
};

export {
	generateUsers,
};
