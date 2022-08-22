import { generateInterviews } from './data/interviews';
import { pool } from '../../pool';
import { generateTraineeProfiles } from './data/traineeProfiles';
import { generateHrProfiles } from './data/hrProfiles';
import { generateTraineeScores } from './data/traineeScores';
import { generateUsers } from './data/users';

/*Warning!
1) When changing amount of generated data, make sure to provide matching amounts of entities.
	For instance if generating 10 users of 'trainee' role make sure go to generate 10 trainee-profiles and 10 trainee-scores etc.
2) `generateUsers` function always return 1 admin and provided amount of hrs and trainees.
3) `generateInterviews` function will relate first 5 (or another provided amount) of hr's and trainees.
4) `interviewedAmount` argument of `generateTraineeProfiles` function will set `status` property of first 5(or another provided amount) generated profiles as interviewed.
Because of that, it has to match `amount` argument of `generateInterviews` function.
*/
const users = generateUsers(20, 180);
const traineeScores = generateTraineeScores(180);
const hrProfiles = generateHrProfiles(20);
const traineeProfiles = generateTraineeProfiles(180, 10);
const interviews = generateInterviews(10);

const insertDummyUsers = async () => {
	try {
		for (const user of users) {
			const { id, email, role, password, registerToken } = user;
			await pool.execute(
				`INSERT INTO users (id, email, password, role, registerToken)
				 VALUES (:id, :email, :password, :role, :registerToken)`,
				{
					id,
					email,
					role,
					password,
					registerToken,
				},
			);
		}
		console.log('\t✔ users dummy data inserted');
	} catch (e) {
		throw e;
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
			const bonusProjectUrlsStringify = JSON.stringify(bonusProjectUrls);
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
						 :bonusProjectUrlsStringify,
						 :userId)`,
				{
					id,
					courseCompletion,
					courseEngagment,
					projectDegree,
					teamProjectDegree,
					bonusProjectUrlsStringify,
					userId,
				},
			);
		}
		console.log('\t✔ trainee_scores dummy data inserted');
	} catch (e) {
		throw e;
	}
};

const insertDummyHrProfiles = async () => {
	try {
		for (const hrp of hrProfiles) {
			const { id, fullName, company, maxReservedStudents, userId } = hrp;
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
				`,
				{
					id,
					fullName,
					company,
					maxReservedStudents,
					userId,
				},
			);
		}
		console.log('\t✔ hr_profiles dummy data inserted');
	} catch (e) {
		throw e;
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
			const portfolioUrlsStringify = JSON.stringify(portfolioUrls);
			const projectUrlsStringify = JSON.stringify(projectUrls);
			const expectedContractTypeStringify =
				JSON.stringify(expectedContractType);
			await pool.execute(
				`
					INSERT INTO trainee_profile (id,
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
												 userId)
					VALUES (:id,
					        :tel,
							:firstName,
							:lastName,
							:githubUsername,
							:portfolioUrlsStringify,
							:projectUrlsStringify,
							:bio,
							:expectedTypeWork,
							:targetWorkCity,
							:expectedContractTypeStringify,
							:expectedSalary,
							:canTakeApprenticeship,
							:monthsOfCommercialExp,
							:education,
							:workExperience,
							:courses,
							:status,
							:registrationUrl,
							:userId)
				`,
				{
					id,
					tel,
					firstName,
					lastName,
					githubUsername,
					portfolioUrlsStringify,
					projectUrlsStringify,
					bio,
					expectedTypeWork,
					targetWorkCity,
					expectedContractTypeStringify,
					expectedSalary,
					canTakeApprenticeship,
					monthsOfCommercialExp,
					education,
					workExperience,
					courses,
					status,
					registrationUrl,
					userId,
				},
			);
		}
		console.log('\t✔ trainee profiles dummy data inserted');
	} catch (e) {
		throw e;
	}
};

const insertDummyInterviews = async () => {
	try {
		for (const interview of interviews) {
			const { id, hrId, traineeId, scheduledFor } = interview;
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
				`,
				{
					id,
					hrId,
					traineeId,
					scheduledFor,
				},
			);
		}
		console.log('\t✔ interviews dummy data inserted');
	} catch (e) {
		throw e;
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
