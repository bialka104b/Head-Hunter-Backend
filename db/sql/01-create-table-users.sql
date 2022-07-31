DROP TABLE IF EXISTS users;

CREATE TABLE users
(
	id             VARCHAR(36) PRIMARY KEY                  DEFAULT (UUID()),
	email          VARCHAR(256) UNIQUE             NOT NULL,
	password       VARCHAR(255)                     NOT NULL,
	role           ENUM ('admin', 'hr', 'trainee') NOT NULL,
	currentTokenId VARCHAR(256)                             DEFAULT NULL,
	registerToken  VARCHAR(36)                              DEFAULT NUll,
	createdAt      DATE                            NOT NULL DEFAULT (NOW()),
	isActive       BOOLEAN                         NOT NULL DEFAULT TRUE
);
