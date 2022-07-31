export const getAllListedTrainees =
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
			AND users.isActive = true
	`
;
