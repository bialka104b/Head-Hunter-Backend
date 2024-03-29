export const insertMe =
	`
		INSERT INTO users (id, email, password, role, currentTokenId, registerToken, createdAt, isActive)
		VALUES (:id, :email, :password, :role, :currentTokenId, :registerToken,
				:createdAt, :isActive)
	`
;

export const updatePassword =
	`
		UPDATE users
		SET password = :password
		WHERE id = :id
	`
;

export const createPassword =
	`
		UPDATE users
		SET password = :password,
		registerToken = :registerToken
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

export const getInactiveUserById =
	`
		SELECT *
		FROM users
		WHERE id = :id
	`
;

export const findUserByEmail =
	`
	SELECT *
	 FROM users
	 WHERE email = :email
	`
;

export const deleteUserById =
	`
		UPDATE users
		SET isActive = false
		WHERE id = :id
	`
;

export const unregisterUsers =
	`
	SELECT id, email, registerToken
	FROM users
	WHERE registerToken IS NOT NULL
	`
;

export const activateUser =
	`
	UPDATE users
	SET isActive = true
	WHERE id = :id
	`
;

export const getAdminEmail =
	`
	SELECT email
	FROM users
	WHERE role = 'admin'
	`
;
