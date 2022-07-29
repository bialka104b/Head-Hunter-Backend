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
		WHERE id = :id
	`
;
