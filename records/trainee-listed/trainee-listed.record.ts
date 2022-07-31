import {
	TraineeListedEntity,
} from '../../types/trainee-listed/trainee-listed.entity';
import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork,
} from '../../types/trainee-profile/trainee-profile';
import { pool } from '../../db/pool';
import { FieldPacket } from 'mysql2';
import { getAllListedTrainees } from './sql';

type DbResult = [TraineeListedEntity[], FieldPacket[]];

export class TraineeListedRecord implements TraineeListedEntity {
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

	constructor(obj: TraineeListedEntity) {
		this.id = obj.id;
		this.email = obj.email;
		this.firstName = obj.firstName;
		this.lastName = obj.lastName;
		this.courseCompletion = obj.courseCompletion;
		this.courseEngagment = obj.courseEngagment;
		this.projectDegree = obj.projectDegree;
		this.teamProjectDegree = obj.teamProjectDegree;
		this.expectedTypeWork = obj.expectedTypeWork;
		this.targetWorkCity = obj.targetWorkCity;
		this.expectedContractType = obj.expectedContractType;
		this.expectedSalary = obj.expectedSalary;
		this.canTakeApprenticeship = obj.canTakeApprenticeship;
		this.monthsOfCommercialExp = obj.monthsOfCommercialExp;
	}

	//TODO - add pagination;
	static async getAllListedTrainees(): Promise<TraineeListedEntity[] | null> {
		const resp = (await pool.execute(getAllListedTrainees) as DbResult)[0];
		return resp.length !== 0 ? resp.map(el => new TraineeListedRecord(el)) : null;
	}
}
