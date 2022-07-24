DROP TABLE IF EXISTS interviews;

CREATE TABLE interviews
(
    id        VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    hrId      VARCHAR(256) NOT NULL,
    traineeId VARCHAR(256) NOT NULL,
    scheduledFor DATETIME,
    createdAt DATE         NOT NULL   DEFAULT (NOW()),
    isActive  BOOLEAN                 DEFAULT TRUE,
    CONSTRAINT fk_invitation_hr FOREIGN KEY (hrId) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_invitation_trainee FOREIGN KEY (traineeId) REFERENCES users (id) ON DELETE CASCADE
);
