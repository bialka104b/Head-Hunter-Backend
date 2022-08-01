import {
	TraineeProfileEntity,
} from './trainee-profile.entity';

import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork,
} from './trainee-profile';

interface TraineeListedEntity {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	courseCompletion: number;
	courseEngagment: number;
	projectDegree: number;
	teamProjectDegree: number;
	expectedTypeWork: TraineeExpectedTypeWork | null;
	targetWorkCity: string;
	expectedContractType: TraineeExpectedContractType[] | null;
	expectedSalary: string;
	canTakeApprenticeship: boolean;
	monthsOfCommercialExp: number;
}

interface TraineeFullInfoEntity extends TraineeProfileEntity {
	email: string;
}

export {
	TraineeFullInfoEntity,
	TraineeListedEntity,
};
