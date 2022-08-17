import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork,
} from './trainee-profile';

export interface TraineeProfileRequest {
	userId: string;
	firstName: string;
	lastName: string;
	githubUsername?: string;
	tel: string;
	bio: string;
	education: string;
	targetWorkCity: string;
	workExperience: string;
	portfolioUrl1: string;
	portfolioUrl2: string;
	portfolioUrl3: string;
	portfolioUrl4: string;
	portfolioUrl5: string;
	projectUrl1: string;
	projectUrl2: string;
	projectUrl3: string;
	projectUrl4: string;
	projectUrl5: string;
	courses: string;
	expectedTypeWork: TraineeExpectedTypeWork;
	expectedContractType: TraineeExpectedContractType[];
	canTakeApprenticeship: 'true' | 'false';
	monthsOfCommercialExp: string;
	expectedSalary: string;
}
