//TODO - ustalić nazewnictwo dla queries;

export const insertMe =
	`
		INSERT INTO users (id, email, password, role, currentTokenId, createdAt, isActive)
		VALUES (:id, :email, :password, :role, :currentTokenId,
				:createdAt, :isActive)
	`
;

export const updateMe =
	`
		UPDATE users
		SET email          = :email,
			role           = :role,
			currentTokenId = :currentTokenId
		WHERE id = :id
	`
;

export const updatePassword =
	`
		UPDATE users
		SET password = :password
		WHERE id = :id
	`
;

export const getAllUsers =
	`
		SELECT *
		FROM users
		WHERE isActive = true;
	`
;

export const getUserById =
	`
		SELECT *
		FROM users
		WHERE id = :id
		  AND isActive = true
	`
;
export const findUserByEmail =
	`SELECT *
	 FROM users
	 WHERE email = :email
	   AND isActive = true
	`
;

export const deleteUserById =
	`
		UPDATE users
		SET isActive = false
		WHERE id = :id
	`
;
