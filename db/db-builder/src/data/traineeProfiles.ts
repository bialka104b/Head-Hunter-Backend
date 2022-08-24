import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork,
	TraineeStatus,
} from '../../../../types';
import { faker } from '@faker-js/faker';
import { getRandomNumber } from './utils/getRandomIncludes';

const getRandomTypeWork = (): TraineeExpectedTypeWork => {
	const random = getRandomNumber(0, 3);
	switch (random) {
		case 0:
			return TraineeExpectedTypeWork.onsite;
		case 1:
			return TraineeExpectedTypeWork.hybrid;
		case 2:
			return TraineeExpectedTypeWork.remote;
		case 3:
			return TraineeExpectedTypeWork.readyToMove;
		default:
			return TraineeExpectedTypeWork.hybrid;
	}
};

const getRandomCanTakeApprenticeship = () => {
	const random = getRandomNumber(0, 1);
	let canTakeApprenticeship;
	canTakeApprenticeship = random === 0;
	return canTakeApprenticeship;
};

const getRandomExpectedContractType = (): TraineeExpectedContractType[] => {
	const expectedContractTypeArr = [];
	for (let i = 0; i < 3; i++) {
		const random = getRandomNumber(0, 2);
		let expectedContractType;
		if (random === 0) {
			expectedContractType = TraineeExpectedContractType.uop;
		}
		if (random === 1) {
			expectedContractType = TraineeExpectedContractType.b2b;
		}
		if (random === 2) {
			expectedContractType = TraineeExpectedContractType.uzuod;
		}
		expectedContractTypeArr.push(expectedContractType);
	}

	function onlyUniqueFilter(value: any, index: any, self: any) {
		return self.indexOf(value) === index;
	}

	return expectedContractTypeArr.filter(onlyUniqueFilter);
};

export const generateTraineeProfiles = (
	amount: number,
	interviewedAmount: number,
) => {
	const TraineeProfileArr = [];
	for (let i = 0; i < amount; i++) {
		const traineeProfile = {
			id: `tp${i + 1}`,
			tel: faker.phone.number(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			githubUsername: faker.internet.userName(),
			portfolioUrls: [faker.internet.url(), faker.internet.url()],
			projectUrls: [faker.internet.url()],
			bio: faker.lorem.paragraph(),
			expectedTypeWork: getRandomTypeWork(),
			targetWorkCity: faker.address.city(),
			expectedContractType: getRandomExpectedContractType(),
			expectedSalary: getRandomNumber(500, 15000),
			canTakeApprenticeship: getRandomCanTakeApprenticeship(),
			monthsOfCommercialExp: getRandomNumber(0, 6),
			education: faker.lorem.paragraph(1),
			workExperience: faker.lorem.paragraph(2),
			courses: faker.lorem.paragraph(1),
			status:
				i < interviewedAmount
					? TraineeStatus.interviewed
					: TraineeStatus.available,
			registrationUrl: '',
			userId: `trainee${i + 1}`,
		};
		TraineeProfileArr.push(traineeProfile);
	}
	return TraineeProfileArr;
};
