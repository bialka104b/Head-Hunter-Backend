import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork,
} from '../trainee-profile/trainee-profile';

export interface TraineeListedEntity {
	id: string; //user
	email: string; // user
	firstName: string;  //trainee-profile;
	lastName: string; //trainee-profile;
	courseCompletion: number; //trainee-score
	courseEngagment: number;  //trainee-score
	projectDegree: number; //trainee-score
	teamProjectDegree: number; //trainee-score
	expectedTypeWork: TraineeExpectedTypeWork | null; //trainee-profile;
	targetWorkCity: string;  //trainee-profile;
	expectedContractType: TraineeExpectedContractType[] | null; //trainee-profile;
	expectedSalary: string; //trainee-profile;
	canTakeApprenticeship: boolean; //trainee-profile;
	monthsOfCommercialExp: number; //trainee-profile;
}
