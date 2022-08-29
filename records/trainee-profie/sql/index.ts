import { TraineeStatus } from '../../../types';

export const insertMe = `
		INSERT INTO trainee_profile
		VALUES (:id,
				:tel,
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
				:userId,
				:createdAt)
	`;

export const updateTrainee = `
		UPDATE trainee_profile
		SET tel                   = :tel,
			firstName             = :firstName,
			lastName              = :lastName,
			githubUsername        = :githubUsername,
			portfolioUrls         = :portfolioUrls,
			projectUrls           = :projectUrls,
			bio                   = :bio,
			expectedTypeWork      = :expectedTypeWork,
			targetWorkCity        = :targetWorkCity,
			expectedContractType  = :expectedContractType,
			expectedSalary        = :expectedSalary,
			canTakeApprenticeship = :canTakeApprenticeship,
			monthsOfCommercialExp = :monthsOfCommercialExp,
			education             = :education,
			workExperience        = :workExperience,
			courses               = :courses
		WHERE userId = :userId
	`;

export const updateStatus = `
		UPDATE trainee_profile
		SET status = :status
		WHERE id = :id
	`;

export const getAllTraineesProfiles = `
		SELECT *
		FROM trainee_profile
	`;

export const getTraineeProfileById = `
		SELECT *
		FROM trainee_profile
		WHERE userId = :id
	`;

export const getFullTraineeInfo = `
		SELECT users.id,
			   users.email,
			   ts.bonusProjectUrls,
			   ts.courseCompletion,
			   ts.courseEngagment,
			   ts.teamProjectDegree,
			   ts.projectDegree,
			   tp.tel,
			   tp.firstName,
			   tp.lastName,
			   tp.githubUsername,
			   tp.portfolioUrls,
			   tp.projectUrls,
			   tp.bio,
			   tp.expectedTypeWork,
			   tp.targetWorkCity,
			   tp.expectedContractType,
			   tp.expectedSalary,
			   tp.canTakeApprenticeship,
			   tp.monthsOfCommercialExp,
			   tp.education,
			   tp.workExperience,
			   tp.courses,
			   tp.status
		FROM users
				 JOIN trainee_profile tp on users.id = tp.userId
				 JOIN trainee_score ts on users.id = ts.userId
		WHERE users.id = :id
	`;

export const getAllListedTrainees = `
		SELECT users.id,
			   email,
			   firstName,
			   lastName,
			   courseCompletion,
			   courseEngagment,
			   projectDegree,
			   teamProjectDegree,
			   expectedTypeWork,
			   targetWorkCity,
			   expectedContractType,
			   expectedSalary,
			   canTakeApprenticeship,
			   monthsOfCommercialExp
		FROM users
				 JOIN trainee_profile tp on users.id = tp.userId
				 JOIN trainee_score ts on users.id = ts.userId
		WHERE
			users.isActive = true
			AND tp.status != 'hired'
			LIMIT :limit
			OFFSET :offsetElement
	`;

export const getTraineesInfoForTraineesInterviewsListById = `
		SELECT users.id,
			   email,
			   firstName,
			   lastName,
			   courseCompletion,
			   courseEngagment,
			   projectDegree,
			   teamProjectDegree,
			   expectedTypeWork,
			   targetWorkCity,
			   expectedContractType,
			   expectedSalary,
			   canTakeApprenticeship,
			   monthsOfCommercialExp
		FROM users
				 JOIN trainee_profile tp on users.id = tp.userId
				 JOIN trainee_score ts on users.id = ts.userId
		WHERE users.id = :id
			AND tp.status != 'hired'
			AND users.isActive = true
	`;

export const getCountOfTrainees = `
		SELECT COUNT(*) as count
		FROM trainee_profile
		WHERE status != 'hired'
	`;

export const getTraineesList = (
	status: string,
	canTakeApprenticeship: string,
	monthsOfCommercialExp: number,
	expectedTypeWork: string,
	expectedSalaryFrom: string,
	expectedSalaryTo: string,
	expectedContractType: string[],
	search: string,
	sortByType: string,
	sortType: string,
	id: string,
): string => {
	return `
		SELECT users.id,
			email,
			firstName,
			lastName,
			githubUsername,
			courseCompletion,
			courseEngagment,
			projectDegree,
			teamProjectDegree,
			expectedTypeWork,
			targetWorkCity,
			expectedContractType,
			expectedSalary,
			canTakeApprenticeship,
			monthsOfCommercialExp
		FROM users
			INNER JOIN trainee_profile tp on users.id = tp.userId
			INNER JOIN trainee_score ts on users.id = ts.userId
			${id ? 'INNER JOIN interviews intv on users.id = intv.traineeId' : ''}
		WHERE users.role = 'trainee'
			${id ? 'AND intv.hrId = :id' : ''}
			${status !== TraineeStatus.hired ? `AND users.isActive = true` : ''}
			${status ? 'AND tp.status = :status' : ''}
			AND ts.courseCompletion >= :courseCompletion
			AND ts.courseEngagment >= :courseEngagment
			AND ts.projectDegree >= :projectDegree
			AND ts.teamProjectDegree >= :teamProjectDegree
			${canTakeApprenticeship === 'true' ? 'AND tp.canTakeApprenticeship = 1' : ''}
			${
				monthsOfCommercialExp
					? 'AND tp.monthsOfCommercialExp >= :monthsOfCommercialExp'
					: ''
			}
			${expectedTypeWork ? 'AND tp.expectedTypeWork = :expectedTypeWork' : ''}
			${expectedSalaryFrom ? 'AND tp.expectedSalary >= :expectedSalaryFrom' : ''}
			${expectedSalaryTo ? 'AND tp.expectedSalary <= :expectedSalaryTo' : ''}
			${
				expectedContractType.length === 1
					? 'AND tp.expectedContractType LIKE "%' +
					  expectedContractType[0] +
					  '%"'
					: ''
			}
			${
				expectedContractType.length === 2
					? 'AND (tp.expectedContractType LIKE "%' +
					  expectedContractType[0] +
					  '%"' +
					  ` OR tp.expectedContractType LIKE "%` +
					  expectedContractType[1] +
					  '%")'
					: ''
			}
			${
				expectedContractType.length === 3
					? 'AND (tp.expectedContractType LIKE "%' +
					  expectedContractType[0] +
					  '%"' +
					  ` OR tp.expectedContractType LIKE "%` +
					  expectedContractType[1] +
					  '%"' +
					  ` OR tp.expectedContractType LIKE "%` +
					  expectedContractType[2] +
					  '%")'
					: ''
			}
			${
				search
					? 'AND (targetWorkCity LIKE "%' +
					  search +
					  '%" OR expectedTypeWork LIKE "%' +
					  search +
					  '%" OR expectedContractType LIKE "%' +
					  search +
					  '%" OR firstName LIKE "%' +
					  search +
					  '%" OR lastName LIKE "%' +
					  search +
					  '%")'
					: ''
			}

		ORDER BY ${sortByType ? sortByType : `courseCompletion`} ${
		sortType === 'ascending' ? 'ASC' : 'DESC'
	}

		LIMIT :limit
		OFFSET :offsetElement
	`;
};

export const getCountOfTraineesList = (
	status: string,
	canTakeApprenticeship: string,
	monthsOfCommercialExp: number,
	expectedTypeWork: string,
	expectedSalaryFrom: string,
	expectedSalaryTo: string,
	expectedContractType: string[],
	search: string,
	id: string,
): string => {
	return `
		SELECT COUNT(*) as count
		FROM users
			INNER JOIN trainee_profile tp on users.id = tp.userId
			INNER JOIN trainee_score ts on users.id = ts.userId
			${id ? 'INNER JOIN interviews intv on users.id = intv.traineeId' : ''}
		WHERE users.role = 'trainee'
			${id ? 'AND intv.hrId = :id' : ''}
			${status !== TraineeStatus.hired ? `AND users.isActive = true` : ''}
			${status ? 'AND tp.status = :status' : ''}
			AND ts.courseCompletion >= :courseCompletion
			AND ts.courseEngagment >= :courseEngagment
			AND ts.projectDegree >= :projectDegree
			AND ts.teamProjectDegree >= :teamProjectDegree
			${canTakeApprenticeship === 'true' ? 'AND tp.canTakeApprenticeship = 1' : ''}
			${
				monthsOfCommercialExp
					? 'AND tp.monthsOfCommercialExp >= :monthsOfCommercialExp'
					: ''
			}
			${expectedTypeWork ? 'AND tp.expectedTypeWork = :expectedTypeWork' : ''}
			${expectedSalaryFrom ? 'AND tp.expectedSalary >= :expectedSalaryFrom' : ''}
			${expectedSalaryTo ? 'AND tp.expectedSalary <= :expectedSalaryTo' : ''}
			${
				expectedContractType.length === 1
					? 'AND tp.expectedContractType LIKE "%' +
					  expectedContractType[0] +
					  '%"'
					: ''
			}
			${
				expectedContractType.length === 2
					? 'AND (tp.expectedContractType LIKE "%' +
					  expectedContractType[0] +
					  '%"' +
					  ` OR tp.expectedContractType LIKE "%` +
					  expectedContractType[1] +
					  '%")'
					: ''
			}
			${
				expectedContractType.length === 3
					? 'AND (tp.expectedContractType LIKE "%' +
					  expectedContractType[0] +
					  '%"' +
					  ` OR tp.expectedContractType LIKE "%` +
					  expectedContractType[1] +
					  '%"' +
					  ` OR tp.expectedContractType LIKE "%` +
					  expectedContractType[2] +
					  '%")'
					: ''
			}
			${
				search
					? 'AND (targetWorkCity LIKE "%' +
					  search +
					  '%" OR expectedTypeWork LIKE "%' +
					  search +
					  '%" OR expectedContractType LIKE "%' +
					  search +
					  '%" OR firstName LIKE "%' +
					  search +
					  '%" OR lastName LIKE "%' +
					  search +
					  '%")'
					: ''
			}
	`;
};
