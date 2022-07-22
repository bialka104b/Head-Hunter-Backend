DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id        VARCHAR(36) PRIMARY KEY                  DEFAULT (UUID()),
    email     VARCHAR(256) UNIQUE             NOT NULL,
    password  VARCHAR(72)                     NOT NULL,
    role      ENUM ('admin', 'hr', 'trainee') NOT NULL,
    createdAt DATE                            NOT NULL DEFAULT (NOW()),
    isActive  BOOLEAN                         NOT NULL DEFAULT TRUE
);