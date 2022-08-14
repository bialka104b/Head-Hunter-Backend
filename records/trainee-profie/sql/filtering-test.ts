import { TraineeExpectedTypeWork } from '../../../types';

export const traineeFilteredSql = (expectedTypeWork?: string) => {
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
			${expectedTypeWork && `AND tp.expectedTypeWork = '${expectedTypeWork}'`}
		ORDER by ts.courseCompletion
		LIMIT :limit OFFSET :offsetElement
	`;
};
