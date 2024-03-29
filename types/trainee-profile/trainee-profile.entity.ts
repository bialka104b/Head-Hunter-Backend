import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork,
	TraineeStatus,
} from './trainee-profile';

export interface TraineeProfileEntity {
	id?: string;
	tel?: string;
	firstName: string;
	lastName: string;
	githubUsername: string;
	portfolioUrls?: string[];
	projectUrls: string[];
	bio?: string;
	expectedTypeWork?: TraineeExpectedTypeWork | null;
	targetWorkCity?: string;
	expectedContractType?: TraineeExpectedContractType[] | null;
	expectedSalary?: number;
	canTakeApprenticeship?: boolean;
	monthsOfCommercialExp?: number;
	education?: string;
	workExperience?: string;
	courses?: string;
	status?: TraineeStatus;
	registrationUrl?: string;
	userId?: string | null;
	createdAt?: Date;
}
