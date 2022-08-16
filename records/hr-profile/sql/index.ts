export const insertMe =
	`
		INSERT INTO hr_profile (id, fullName, company, maxReservedStudents, userId, createdAt)
		VALUES (:id,
				:fullName,
				:company,
				:maxReservedStudents,
				:userId,
				:createdAt)
	`
;

export const updateHr =
	`
		UPDATE hr_profile
		SET fullName            = :fullName,
			company             = :company,
			maxReservedStudents = :maxReservedStudents
		WHERE userId = :userId
	`
;

export const getAllHrProfiles =
	`
		SELECT *
		FROM hr_profile
	`
;

export const getHrProfileById =
	`
		SELECT *
		FROM hr_profile
		WHERE userId = :id
	`
;

export const getHrMaxReservedStudentsInfo =
	`
	SELECT maxReservedStudents
	FROM hr_profile
	WHERE userId = :id
	`
;
