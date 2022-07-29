import {
	TraineeProfileEntity,
} from '../../types/trainee-profile/trainee-profile.entity';
import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork,
	TraineeStatus,
} from '../../types/trainee-profile/trainee-profile';
import { v4 as uuid } from 'uuid';
import { pool } from '../../db/pool';
import {
	getAllTraineesProfiles,
	getTraineeProfileById,
	insertMe,
	updateMe,
} from './sql';
import { FieldPacket } from 'mysql2';
import { ValidationError } from '../../utils/ValidationError';

type DbResult = [TraineeProfileRecord[], FieldPacket[]];

const { incorrectMinimumData } = ValidationError.messages.recordInstanceInit.traineeProfile;

export class TraineeProfileRecord implements TraineeProfileEntity {
	id: string;
	tel: string;
	firstName: string;
	lastName: string;
	githubUsername: string;
	portfolioUrls: string[];
	projectUrls: string[];
	bio: string;
	expectedTypeWork: TraineeExpectedTypeWork | null;
	targetWorkCity: string;
	expectedContractType: TraineeExpectedContractType[] | null;
	expectedSalary: string;
	canTakeApprenticeship: boolean;
	monthsOfCommercialExp: number;
	education: string;
	workExperience: string;
	courses: string;
	status: TraineeStatus;
	registrationUrl: string;
	userId: string | null;
	createdAt: Date;

	constructor(obj: TraineeProfileEntity) {
		this.id = obj.id ?? uuid();
		this.tel = obj.tel ?? '';
		this.firstName = obj.firstName; //REQUIRED!
		this.lastName = obj.lastName; //REQUIRED!
		this.githubUsername = obj.githubUsername; //REQUIRED!
		this.portfolioUrls = obj.portfolioUrls ?? [];
		this.projectUrls = obj.projectUrls; //REQUIRED!
		this.bio = obj.bio ?? '';
		this.expectedTypeWork = obj.expectedTypeWork ?? null;
		this.targetWorkCity = obj.targetWorkCity ?? '';
		this.expectedContractType = obj.expectedContractType ?? null;
		this.expectedSalary = obj.expectedSalary ?? '';
		this.canTakeApprenticeship = obj.canTakeApprenticeship ?? false;
		this.monthsOfCommercialExp = obj.monthsOfCommercialExp ?? 0;
		this.education = obj.education ?? '';
		this.workExperience = obj.workExperience ?? '';
		this.courses = obj.courses ?? '';
		this.status = obj.status ?? TraineeStatus.available;
		this.registrationUrl = obj.registrationUrl ?? '';
		this.userId = obj.userId ?? null;
		this.createdAt = obj.createdAt ?? new Date();
		this.validation();
	}

	validation() {
		if (!this.firstName || !this.lastName || !this.githubUsername || !this.projectUrls) {
			throw new ValidationError(incorrectMinimumData, 400);
		}
	}

	//dynamic:
	async insertMe(): Promise<string> {
		await pool.execute(insertMe, {
			id: this.id,
			tel: this.tel,
			firstName: this.firstName,
			lastName: this.lastName,
			githubUsername: this.githubUsername,
			portfolioUrls: JSON.stringify(this.portfolioUrls),
			projectUrls: JSON.stringify(this.projectUrls),
			bio: this.bio,
			expectedTypeWork: this.expectedTypeWork,
			targetWorkCity: this.targetWorkCity,
			expectedContractType: JSON.stringify(this.expectedContractType),
			expectedSalary: this.expectedSalary,
			canTakeApprenticeship: this.canTakeApprenticeship,
			monthsOfCommercialExp: this.monthsOfCommercialExp,
			education: this.education,
			workExperience: this.workExperience,
			courses: this.courses,
			status: this.status,
			registrationUrl: this.registrationUrl,
			userId: this.userId,
			createdAt: this.createdAt,
		});
		return this.id;
	}

	async updateMe(): Promise<string> {
		await pool.execute(updateMe, {
			id: this.id,
			tel: this.tel,
			firstName: this.firstName,
			lastName: this.lastName,
			githubUsername: this.githubUsername,
			portfolioUrls: JSON.stringify(this.portfolioUrls),
			projectUrls: JSON.stringify(this.projectUrls),
			bio: this.bio,
			expectedTypeWork: this.expectedTypeWork,
			targetWorkCity: this.targetWorkCity,
			expectedContractType: JSON.stringify(this.expectedContractType),
			expectedSalary: this.expectedSalary,
			canTakeApprenticeship: this.canTakeApprenticeship,
			monthsOfCommercialExp: this.monthsOfCommercialExp,
			education: this.education,
			workExperience: this.workExperience,
			courses: this.courses,
			status: this.status,
			registrationUrl: this.registrationUrl,
			userId: this.userId,
		});
		return this.id;
	}

	//static:
	static async getAllTraineesProfiles(): Promise<TraineeProfileRecord[] | null> {
		const resp = (await pool.execute(getAllTraineesProfiles) as DbResult)[0];
		return resp.length !== 0 ? resp.map(el => new TraineeProfileRecord(el)) : null;
	}

	static async getTraineeProfileById(id: string): Promise<TraineeProfileRecord | null> {
		const [resp] = (await pool.execute(getTraineeProfileById, { id }) as DbResult)[0];
		return resp ? new TraineeProfileRecord(resp) : null;
	}
}
