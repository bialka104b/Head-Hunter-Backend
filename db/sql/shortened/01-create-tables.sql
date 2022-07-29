DROP TABLE IF EXISTS users;

CREATE TABLE users
(
	id             VARCHAR(36) PRIMARY KEY                  DEFAULT (UUID()),
	email          VARCHAR(256) UNIQUE             NOT NULL,
	password       VARCHAR(72)                     NOT NULL,
	role           ENUM ('admin', 'hr', 'trainee') NOT NULL,
	currentTokenId VARCHAR(256)                             DEFAULT NULL,
	registerToken  VARCHAR(36)                              DEFAULT NUll,
	createdAt      DATE                            NOT NULL DEFAULT (NOW()),
	isActive       BOOLEAN                         NOT NULL DEFAULT TRUE
);

DROP TABLE IF EXISTS trainee_score;

CREATE TABLE trainee_score
(
	id                VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
	courseCompletion  DECIMAL(3,2) NOT NULL,
	courseEngagment   DECIMAL(3,2) NOT NULL,
	projectDegree     DECIMAL(3,2) NOT NULL,
	teamProjectDegree DECIMAL(3,2) NOT NULL,
	bonusProjectUrls  JSON    NOT NULL,
	userId            VARCHAR(36),
	createdAt         DATE    NOT NULL        DEFAULT (NOW()),
	CONSTRAINT c1_courseCompletion_0to5 CHECK (courseCompletion BETWEEN 0 AND 5),
	CONSTRAINT c2_courseEngagment_0to5 CHECK (courseEngagment BETWEEN 0 AND 5),
	CONSTRAINT c3_projectDegree_0to5 CHECK (projectDegree BETWEEN 0 AND 5),
	CONSTRAINT c4_teamProjectDegree_0to5 CHECK (projectDegree BETWEEN 0 AND 5),
	CONSTRAINT fk_trainee_score_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS hr_profile;

CREATE TABLE hr_profile
(
	id                  VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
	fullName            VARCHAR(256) NOT NULL,
	company             VARCHAR(256) NOT NULL,
	maxReservedStudents SMALLINT     NOT NULL,
	userId              VARCHAR(36),
	createdAt           DATE         NOT NULL   DEFAULT (NOW()),
	CONSTRAINT c1_maxReservedStudents_0to990 CHECK (maxReservedStudents BETWEEN 1 AND 999),
	CONSTRAINT fk_hr_profile_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS trainee_profile;

CREATE TABLE trainee_profile
(
	id                    VARCHAR(36) PRIMARY KEY                           DEFAULT (UUID()),
	tel                   VARCHAR(36),
	firstName             VARCHAR(256)        NOT NULL,
	lastName              VARCHAR(256)        NOT NULL,
	githubUsername        VARCHAR(256) UNIQUE NOT NULL,
	portfolioUrls         JSON,
	projectUrls           JSON                NOT NULL,
	bio                   TEXT,
	expectedTypeWork      ENUM ('onsite', 'remote', 'readyToMove','hybrid') DEFAULT NULL,
	targetWorkCity        VARCHAR(256),
	expectedContractType  JSON                                              DEFAULT NULL,
	expectedSalary        VARCHAR(256)                                      DEFAULT NULL,
	canTakeApprenticeship BOOLEAN                                           DEFAULT FALSE,
	monthsOfCommercialExp TINYINT                                           DEFAULT 0,
	education             TEXT,
	workExperience        TEXT,
	courses               TEXT,
	status                ENUM ('available', 'interviewed', 'hired')        DEFAULT ('available'),
	registrationUrl       VARCHAR(512)                                      DEFAULT NULL,
	userId                VARCHAR(36),
	createdAt             DATE                NOT NULL                      DEFAULT (NOW()),
	CONSTRAINT fk_trainee_profile_user FOREIGN KEY (userId) REFERENCES users (id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS interviews;

CREATE TABLE interviews
(
	id           VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
	hrId         VARCHAR(256) NOT NULL,
	traineeId    VARCHAR(256) NOT NULL,
	scheduledFor DATETIME,
	createdAt    DATE         NOT NULL   DEFAULT (NOW()),
	isActive     BOOLEAN                 DEFAULT TRUE,
	CONSTRAINT fk_invitation_hr FOREIGN KEY (hrId) REFERENCES users (id) ON DELETE CASCADE,
	CONSTRAINT fk_invitation_trainee FOREIGN KEY (traineeId) REFERENCES users (id) ON DELETE CASCADE
);
