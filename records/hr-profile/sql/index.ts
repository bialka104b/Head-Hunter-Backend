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

export const updateMe =
	`
		UPDATE hr_profile
		SET fullName            = :fullName,
			company             = :company,
			maxReservedStudents = :maxReservedStudents,
			userId              = :userId
		WHERE id = :id
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
		WHERE id = :id
	`
;
