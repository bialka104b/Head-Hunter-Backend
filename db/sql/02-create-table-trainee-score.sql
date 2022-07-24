DROP TABLE IF EXISTS trainee_score;

CREATE TABLE trainee_score
(
    id                VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    courseCompletion  TINYINT      NOT NULL,
    courseEngagment   TINYINT      NOT NULL,
    projectDegree     TINYINT      NOT NULL,
    teamProjectDegree TINYINT      NOT NULL,
    bonusProjectUrls  JSON NOT NULL,
    userId            VARCHAR(36),
    createdAt         DATE     NOT NULL   DEFAULT (NOW()),
    CONSTRAINT c1_courseCompletion_0to5 CHECK (courseCompletion BETWEEN 0 AND 5),
    CONSTRAINT c2_courseEngagment_0to5 CHECK (courseEngagment BETWEEN 0 AND 5),
    CONSTRAINT c3_projectDegree_0to5 CHECK (projectDegree BETWEEN 0 AND 5),
    CONSTRAINT c4_teamProjectDegree_0to5 CHECK (projectDegree BETWEEN 0 AND 5),
    CONSTRAINT fk_trainee_score_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);
