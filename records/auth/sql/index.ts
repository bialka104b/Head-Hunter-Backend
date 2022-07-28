export const findTokenId =
	`
	SELECT currentTokenId
	FROM users
	WHERE currentTokenId = :currentTokenId
	`
;

export const generateToken =
	`
	UPDATE users
	SET currentTokenId = :token
	WHERE id = :id
	`
;

export const logout =
	`
	UPDATE users
	SET currentTokenId = NULL
	WHERE id = :id
	`
;

export const login =
	`
	SELECT id, email, password, currentTokenId, role
	FROM users
	WHERE email = :email
	AND isActive = :isActive
	`
;
