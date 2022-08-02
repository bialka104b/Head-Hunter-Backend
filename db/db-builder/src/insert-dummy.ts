import { pool } from '../../pool';
import { users } from './data/users';
import { traineeScores } from './data/traineeScores';
import { hrProfiles } from './data/hrProfiles';
import { traineeProfiles } from './data/traineeProfiles';
import {
	TraineeExpectedContractType,
	TraineeExpectedTypeWork, TraineeStatus,
} from '../../../types/trainee-profile/trainee-profile';
import { interviews } from './data/interviews';

const insertDummyUsers = async () => {
	try {
		for (const user of users) {
			const { id, email, role, password } = user;
			await pool.execute(`INSERT INTO users (id, email, password, role)
								VALUES (:id, :email, :password, :role)`, {
				id, email, role, password,
			});
		}
		console.log('\t✔ users dummy data inserted');
	} catch (e) {
		console.log(e);
	}
};

const insertDummyTraineeScores = async () => {
	try {
		for (const ts of traineeScores) {
			const {
				id,
				courseCompletion,
				courseEngagment,
				projectDegree,
				teamProjectDegree,
				bonusProjectUrls,
				userId,
			} = ts;
			await pool.execute(
				`INSERT INTO trainee_score (id,
											courseCompletion,
											courseEngagment,
											projectDegree,
											teamProjectDegree,
											bonusProjectUrls,
											userId)
				 VALUES (:id,
						 :courseCompletion,
						 :courseEngagment,
						 :projectDegree,
						 :teamProjectDegree,
						 :bonusProjectUrls,
						 :userId)`, {
					id,
					courseCompletion,
					courseEngagment,
					projectDegree,
					teamProjectDegree,
					bonusProjectUrls,
					userId,
				});
		}
		console.log('\t✔ trainee_scores dummy data inserted');
	} catch (e) {
		console.log(e);
	}
};

const insertDummyHrProfiles = async () => {
	try {
		for (const hrp of hrProfiles) {
			const {
				id,
				fullName,
				company,
				maxReservedStudents,
				userId,
			} = hrp;
			await pool.execute(
				`
					INSERT INTO hr_profile (id,
											fullName,
											company,
											maxReservedStudents,
											userId)
					VALUES (:id,
							:fullName,
							:company,
							:maxReservedStudents,
							:userId)
				`, {
					id,
					fullName,
					company,
					maxReservedStudents,
					userId,
				});
		}
		console.log('\t✔ hr_profiles dummy data inserted');
	} catch (e) {
		console.log(e);
	}
};

const insertDummyTraineeProfiles = async () => {
	try {
		for (const tp of traineeProfiles) {
			const {
				id,
				tel,
				firstName,
				lastName,
				githubUsername,
				portfolioUrls,
				projectUrls,
				bio,
				expectedTypeWork,
				targetWorkCity,
				expectedContractType,
				expectedSalary,
				canTakeApprenticeship,
				monthsOfCommercialExp,
				education,
				workExperience,
				courses,
				status,
				registrationUrl,
				userId,
			} = tp;
			await pool.execute(
				`
					INSERT INTO trainee_profile (tel,
												 firstName,
												 lastName,
												 githubUsername,
												 portfolioUrls,
												 projectUrls,
												 bio,
												 expectedTypeWork,
												 targetWorkCity,
												 expectedContractType,
												 expectedSalary,
												 canTakeApprenticeship,
												 monthsOfCommercialExp,
												 education,
												 workExperience,
												 courses,
												 status,
												 registrationUrl,
												 userId)
					VALUES (:tel,
							:firstName,
							:lastName,
							:githubUsername,
							:portfolioUrls,
							:projectUrls,
							:bio,
							:expectedTypeWork,
							:targetWorkCity,
							:expectedContractType,
							:expectedSalary,
							:canTakeApprenticeship,
							:monthsOfCommercialExp,
							:education,
							:workExperience,
							:courses,
							:status,
							:registrationUrl,
							:userId)
				`, {
					tel,
					firstName,
					lastName,
					githubUsername,
					portfolioUrls,
					projectUrls,
					bio,
					expectedTypeWork,
					targetWorkCity,
					expectedContractType,
					expectedSalary,
					canTakeApprenticeship,
					monthsOfCommercialExp,
					education,
					workExperience,
					courses,
					status,
					registrationUrl,
					userId,
				});
		}
		console.log('\t✔ trainee profiles dummy data inserted');
	} catch (e) {
		console.log(e);
	}
};

const insertDummyInterviews = async () => {
	try {
		for (const interview of interviews) {
			const {
				id,
				hrId,
				traineeId,
				scheduledFor,
			} = interview;
			await pool.execute(
				`
					INSERT INTO interviews (id,
											hrId,
											traineeId,
											scheduledFor)
					VALUES (:id,
							:hrId,
							:traineeId,
							:scheduledFor)
				`, {
					id,
					hrId,
					traineeId,
					scheduledFor,
				});
		}
		console.log('\t✔ interviews dummy data inserted');
	} catch (e) {
		console.log(e);
	}
};


export const insertDummyData = async () => {
	console.log('DUMMY DATA:');
	await insertDummyUsers();
	await insertDummyTraineeScores();
	await insertDummyHrProfiles();
	await insertDummyTraineeProfiles();
	await insertDummyInterviews();
};
