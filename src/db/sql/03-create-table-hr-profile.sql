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