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
