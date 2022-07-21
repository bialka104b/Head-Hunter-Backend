DROP TABLE IF EXISTS trainee_profile;

CREATE TABLE trainee_profile
(
    id                    VARCHAR(36) PRIMARY KEY                           DEFAULT (UUID()),
    tel                   VARCHAR(36),
    firstName             VARCHAR(256)        NOT NULL,
    lastName              VARCHAR(256)        NOT NULL,
    githubUsername        VARCHAR(256) UNIQUE NOT NULL,
    #array of urls:
    portfolioUrls         JSON,
    #array of urls:
    projectUrls           JSON                NOT NULL,
    bio                   TEXT,
    expectedTypeWork      ENUM ('onsite', 'remote', 'readyToMove','hybrid') DEFAULT NULL,
    targetWorkCity        VARCHAR(256),
    #array with 4 optional keys: 'uop', 'btb', 'uz', 'uod' (fe&be have to be responsible for a validation):
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