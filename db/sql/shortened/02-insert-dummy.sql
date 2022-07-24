INSERT INTO users (id, email, password, role)
VALUES
    ('user1', 'rodion.raskolnikov@gmail.com', 'test1234', 'admin'),
    ('user2', 's.emyonovna@gmail.com', 'test1234', 'hr'),
    ('user3', 'a.romanovna@gmail.com', 'test1234', 'hr'),
    ('user4', 'a.svidrigailov@gmail.com', 'test1234', 'trainee'),
    ('user5', 'd.razumikhin@gmail.com', 'test1234', 'trainee'),
    ('user6', 's.marmeladov@gmail.com', 'test1234', 'trainee'),
    ('user7', 'p.petrovich@gmail.com', 'test1234', 'trainee'),
    ('user8', 'p.luzhin@gmail.com', 'test1234', 'trainee')
;

INSERT INTO trainee_score
VALUES ('score1', 3, 4, 5, 1, '[
  "https://github.com"
]', 'user4', DEFAULT),
       ('score2', 5, 4, 4, 5, '[
         "https://github.com"
       ]', 'user5', DEFAULT),
       ('score3', 1, 3, 5, 4, '[
         "https://github.com"
       ]', 'user6', DEFAULT),
       ('score4', 0, 5, 3, 2, '[
         "https://github.com"
       ]', 'user7', DEFAULT),
       ('score5', 4, 3, 5, 4, '[
         "https://github.com"
       ]', 'user8', DEFAULT);

INSERT INTO hr_profile (id, fullName, company, maxReservedStudents, userId, createdAt)
VALUES ('hrProfile1', 'Sofya Semyonovna Marmeladov', 'IT.Focus', 3, 'user2', DEFAULT),
       ('hrProfile2', 'Avdotya Romanovna Raskolnikov', 'IT.Distraction', 1, 'user3', DEFAULT);

INSERT INTO trainee_profile (id, tel, firstName, lastName, githubUsername, portfolioUrls, projectUrls, bio,
                             expectedTypeWork, targetWorkCity, expectedContractType, expectedSalary,
                             canTakeApprenticeship, monthsOfCommercialExp, education, workExperience, courses, status,
                             registrationUrl, userId, createdAt)
VALUES ('traineeProfile1', '+11 111 111 111', 'Arkady', 'Svidrigailov', 'svidrigailov', '[
  "https://github.com"
]', '[
  "https://github.com"
]', 'Really nice bio of quite nice guy.', 'onsite', 'Warsaw', '[
  "uop",
  "b2b"
]', '3500$', false, 2, 'Very well educated.', NULL, 'A lot of courses.', 'available', NULL, 'user4', DEFAULT),


       ('traineeProfile2', '+22 222 222 222', 'Dmitri', 'Razumikhin', 'razumikhin', '[
         "https://github.com"
       ]', '[
         "https://github.com"
       ]', 'Really nice bio of quite nice guy.', 'hybrid', 'New York', '[
         "uop"
       ]', '4000$', true, 0, 'Very well educated.', NULL, 'A lot of courses.', 'available', NULL, 'user5', DEFAULT),


       ('traineeProfile3', '+33 333 333 333', 'Semyon', 'Marmeladov', 'marmeladov', '[
         "https://github.com"
       ]', '[
         "https://github.com"
       ]', 'Really nice bio of quite nice guy.', 'remote', 'Berlin', '[
         "uop"
       ]', '2000$', true, 0, 'Very well educated.', NULL, 'A lot of courses.', 'available', NULL, 'user6', DEFAULT),


       ('traineeProfile4', '+44 444 444 444', 'Porfiry', 'Petrovich', 'petrovich', '[
         "https://github.com"
       ]', '[
         "https://github.com"
       ]', 'Really nice bio of quite nice guy.', NULL, 'Lvov', '[
         "uop, b2b, uod, uz"
       ]', '1500$', false, 1, 'Very well educated.', NULL, 'A lot of courses.', 'interviewed', NULL, 'user7', DEFAULT),


       ('traineeProfile5', '+55 555 555 555', 'Pyotr', 'Luzhin', 'luzhin', '[
         "https://github.com"
       ]', '[
         "https://github.com"
       ]', 'Really nice bio of quite nice guy.', 'readyToMove', 'Lvov', '[
         "uz"
       ]', '1500$', false, 1, 'Very well educated.', NULL, 'A lot of courses.', 'hired', NULL, 'user8', DEFAULT);

INSERT INTO interviews (id, hrId, traineeId)
VALUES ('interview1', 'user2', 'user7');
