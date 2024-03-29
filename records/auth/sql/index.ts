export const findTokenId = `
	SELECT currentTokenId
	FROM users
	WHERE currentTokenId = :currentTokenId
	`;

export const generateToken = `
	UPDATE users
	SET currentTokenId = :token
	WHERE id = :id
	`;

export const logout = `
	UPDATE users
	SET currentTokenId = NULL
	WHERE id = :id
	`;

export const login = `
	SELECT id, email, password, currentTokenId, role
	FROM users
	WHERE email = :email
	AND isActive = :isActive
	`;

export const getTraineeName = `
	SELECT firstName, lastName, githubUsername
	FROM trainee_profile
	WHERE userId = :userId
	`;

export const getHrName = `
	SELECT fullName
	FROM hr_profile
	WHERE userId = :userId
	`;

export const changePassword = `
			UPDATE users
		SET password = :hashPwd
		WHERE id = :id
	`;
