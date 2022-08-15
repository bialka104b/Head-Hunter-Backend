import {
	sortParamsObj,
} from '../../../controllers/trainees/trainees.controller';

export const insertMe =
	`
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
	`
;

export const updateMe =
	`
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
			courses               = :courses,
			status                = :status,
			registrationUrl       = :registrationUrl,
			userId                = :userId
		WHERE id = :id
	`
;

export const updateStatus =
	`
		UPDATE trainee_profile
		SET status = :status
		WHERE id = :id
	`
;

export const getAllTraineesProfiles =
	`
		SELECT *
		FROM trainee_profile
	`
;

export const getTraineeProfileById =
	`
		SELECT *
		FROM trainee_profile
		WHERE userId = :id
	`
;

export const getFullTraineeInfo =
	`
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
			AND users.isActive = true
	`
;

export const getAllListedTrainees = (
	sortParams: sortParamsObj,
		expectedTypeWork?: string,
		expectedContractType?: any,
		canTakeApprenticeship?: any,
	): string => {
		return `
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
					 INNER JOIN trainee_profile tp on users.id = tp.userId
					 INNER JOIN trainee_score ts on users.id = ts.userId
			WHERE users.isActive = true
			  AND users.role = 'trainee'
			  AND tp.status = 'available'
			  AND ts.courseCompletion >= :courseCompletion
			  AND ts.courseEngagment >= :courseEngagment
			  AND ts.projectDegree >= :projectDegree
			  AND ts.teamProjectDegree >= :teamProjectDegree
				${expectedTypeWork ? 'AND tp.expectedTypeWork = :expectedTypeWork' : ''} ${expectedContractType.b2b ? `AND JSON_SEARCH(tp.expectedContractType, 'all', 'b2b')` : ''} ${expectedContractType.uop ? `AND JSON_SEARCH(tp.expectedContractType, 'all', 'uop')` : ''} ${expectedContractType.uzuod ? `AND JSON_SEARCH(tp.expectedContractType, 'all', 'uz/uod')` : ''}
			  AND tp.expectedSalary BETWEEN :expectedSalaryFrom
			  AND :expectedSalaryTo ${canTakeApprenticeship ? `AND tp.canTakeApprenticeship = ${canTakeApprenticeship.value}` : ''}
			  AND tp.monthsOfCommercialExp >= :monthsOfCommercialExp
			    ${sortParams.key ? `ORDER BY ${sortParams.key} ${sortParams.direction}` : ''}
			LIMIT :limit OFFSET :offsetElement
		`;
	}
;

export const getCountOfAllListedTrainees = (
		expectedTypeWork?: string,
		expectedContractType?: any,
		canTakeApprenticeship?: any,
	): string => {
		return `
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
					 INNER JOIN trainee_profile tp on users.id = tp.userId
					 INNER JOIN trainee_score ts on users.id = ts.userId
			WHERE users.isActive = true
			  AND users.role = 'trainee'
			  AND tp.status = 'available'
			  AND ts.courseCompletion >= :courseCompletion
			  AND ts.courseEngagment >= :courseEngagment
			  AND ts.projectDegree >= :projectDegree
			  AND ts.teamProjectDegree >= :teamProjectDegree
				${expectedTypeWork ? 'AND tp.expectedTypeWork = :expectedTypeWork' : ''} ${expectedContractType.b2b ? `AND JSON_SEARCH(tp.expectedContractType, 'all', 'b2b')` : ''} ${expectedContractType.uop ? `AND JSON_SEARCH(tp.expectedContractType, 'all', 'uop')` : ''} ${expectedContractType.uzuod ? `AND JSON_SEARCH(tp.expectedContractType, 'all', 'uz/uod')` : ''}
			  AND tp.expectedSalary BETWEEN :expectedSalaryFrom
			  AND :expectedSalaryTo ${canTakeApprenticeship ? `AND tp.canTakeApprenticeship = ${canTakeApprenticeship.value}` : ''}
			  AND tp.monthsOfCommercialExp >= :monthsOfCommercialExp
		`;
	}
;

export const getTraineesInfoForTraineesInterviewsListById =
	`
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
		  AND users.isActive = true
	`
;

export const getCountOfTrainees =
	`
		SELECT COUNT(*) as count
		FROM trainee_profile
	`
;

