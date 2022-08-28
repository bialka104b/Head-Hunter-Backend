import { UserEntity } from '../../../../types';
import { UserRole } from '../../../../types';
import { faker } from '@faker-js/faker';
import { hashedPassword } from './utils/hashedPassword';
import {v4 as uuid} from 'uuid';

const generateAdmin = (): UserEntity => {
	return {
		id: 'admin1',
		email: 'admin@admin.admin',
		role: UserRole.admin,
		password: hashedPassword,
		registerToken: null,
	};
};

const generateExampleHr = (): UserEntity => {
	return {
		id: 'hr1',
		email: 'hr@hr.hr',
		role: UserRole.hr,
		password: hashedPassword,
		registerToken: null,
	};
}

const generateExampleTrainee = (): UserEntity => {
	return {
		id: 'trainee1',
		email: 'trainee@trainee.trainee',
		role: UserRole.trainee,
		password: hashedPassword,
		registerToken: null,
	};
}

const generateHrs = (amount: number): UserEntity[] => {
	const hrsArr = [];
	for (let i = 1; i < amount; i++) {
		const hr = {
			id: `hr${i + 1}`,
			email: faker.internet.email(),
			role: UserRole.hr,
			password: hashedPassword,
			registerToken: uuid(),
		};
		hrsArr.push(hr);
	}
	return hrsArr;
};

const generateTrainees = (amount: number): UserEntity[] => {
	const hrsArr = [];
	for (let i = 1; i < amount; i++) {
		const trainee = {
			id: `trainee${i + 1}`,
			email: faker.internet.email(),
			role: UserRole.trainee,
			password: hashedPassword,
			registerToken: uuid(),
		};
		hrsArr.push(trainee);
	}
	return hrsArr;
};

const generateUsers = (hrsAmount: number, traineesAmount: number): UserEntity[] => {
	const admin = generateAdmin();
	const exampleHr = generateExampleHr();
	const exampleTrainee = generateExampleTrainee();
	const hrsArr = generateHrs(hrsAmount);
	const traineesArr = generateTrainees(traineesAmount);
	return [
		admin,
		exampleHr,
		exampleTrainee,
		...hrsArr,
		...traineesArr,
	];
};

export {
	generateUsers,
};
