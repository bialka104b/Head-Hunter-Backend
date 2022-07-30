export const unregisterUsers =
	`
	SELECT email, registerToken, id
	FROM users
	WHERE registerToken IS NOT NULL
	`
;
