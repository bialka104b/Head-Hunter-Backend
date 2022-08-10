import {
	FilteredInfo,
	TraineeProfileEntity,
} from '../../types';
import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork,
	TraineeStatus,
} from '../../types';
import { FieldPacket } from 'mysql2';
import { ValidationError } from '../../utils/ValidationError';
import {
	TraineeFullInfoEntity, TraineeListedEntity,
} from '../../types/trainee-profile/trainee-profile.responses';
import { v4 as uuid } from 'uuid';
import { pool } from '../../db/pool';
import {
	getAllListedTrainees,
	getAllTraineesProfiles,
	getCountOfTrainees,
	getFilteredTrainees,
	getFullTraineeInfo,
	getTraineeProfileById,
	getTraineesInfoForTraineesInterviewsListById,
	insertMe,
	updateMe,
	updateStatus,
} from './sql';
//TODO - declare it in a separate file?
type DbResult = [TraineeProfileRecord[], FieldPacket[]];
type DbResultTraineeFullInfo = [TraineeFullInfoEntity[], FieldPacket[]];
type DbResultTraineeListed = [TraineeListedEntity[], FieldPacket[]];
type DbResultInterviewsListTraineesInfoById = DbResultTraineeListed;
type DBResultCountOfTrainees = [{ count: number }[], FieldPacket[]];
type DBResultFilteredTrainees = DbResultTraineeListed


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
	expectedSalary: number;
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
		this.expectedSalary = obj.expectedSalary ?? 0;
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

	async updateStatus(status: string): Promise<void> {
		await pool.execute(updateStatus, {
			status,
			id: this.id
		});
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

	static async getAllListedTrainees(limit: number, offsetElement: number): Promise<TraineeListedEntity[] | null> {
		const resp = (await pool.execute(getAllListedTrainees, { limit, offsetElement }) as DbResultTraineeListed)[0];
		return resp.length !== 0 ? resp : null;
	}

	static async getFullTraineeInfo(id: string): Promise<TraineeFullInfoEntity | null> {
		const [resp] = (await pool.execute(getFullTraineeInfo, { id }) as DbResultTraineeFullInfo)[0];
		return resp ?? null;
	}

	static async getTraineesInfoForTraineesInterviewsListById(id: string): Promise<TraineeListedEntity | null> {
		const [resp] = (await pool.execute(getTraineesInfoForTraineesInterviewsListById, { id }) as DbResultInterviewsListTraineesInfoById)[0];
		return resp ?? null;
	}

	static async getCountOfTrainees(): Promise<number | null> {
		const [resp] = (await pool.execute(getCountOfTrainees) as DBResultCountOfTrainees)[0];
		return resp.count ?? null;
	}

	static async getFilteredTrainees(filteredInfo: FilteredInfo): Promise<TraineeListedEntity[] | null> {
		const {
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
			canTakeApprenticeship,
			monthsOfCommercialExp,
			expectedSalaryFrom,
			expectedSalaryTo,
		} = filteredInfo

		const resp = (await pool.execute(getFilteredTrainees, {
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
			canTakeApprenticeship,
			monthsOfCommercialExp,
			expectedSalaryFrom,
			expectedSalaryTo,
		}) as DBResultFilteredTrainees)[0];
		return resp ?? null
	}
}
