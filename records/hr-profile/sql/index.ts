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
		SET maxReservedStudents = :maxReservedStudents
		WHERE userId = :userId
	`
;

export const getAllHrProfiles =
	`
		SELECT *
		FROM hr_profile
	`
;

export const getCountOfHrProfiles =
	`
		SELECT COUNT(*) as count
		FROM users
		WHERE users.role = "hr" AND users.isActive = true
	`
;

export const getHrProfiles =
	`
		SELECT *
		FROM users
		JOIN hr_profile ON users.id = userId
		WHERE users.isActive = true
		ORDER BY hr_profile.fullName ASC
		LIMIT :limit
		OFFSET :offsetElement
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
