import { faker } from '@faker-js/faker';
import { getRandomNumber } from './utils/getRandomIncludes';

export const generateHrProfiles = (amount:number) => {
	const hrProfilesArr = [];
	for (let i = 0; i < amount; i++) {
		const hrProfile = {
			id: `hrp${i + 1}`,
			fullName: faker.name.fullName(),
			company: faker.company.name(),
			maxReservedStudents: getRandomNumber(1,5),
			userId: `hr${i + 1}`,
		};
		hrProfilesArr.push(hrProfile);
	}
	return hrProfilesArr;
};
