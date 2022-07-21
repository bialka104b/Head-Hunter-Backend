INSERT INTO users (id, email, password, role)
VALUES
    #admin:
    ('user1', 'rodion.raskolnikov@gmail.com', 'test1234', 'admin'),
    #hrs:
    ('user2', 's.emyonovna@gmail.com', 'test1234', 'hr'),
    ('user3', 'a.romanovna@gmail.com', 'test1234', 'hr'),
    #trainees:
    #   available(declared in related trainee_profile table):
    ('user4', 'a.svidrigailov@gmail.com', 'test1234', 'trainee'),
    ('user5', 'd.razumikhin@gmail.com', 'test1234', 'trainee'),
    ('user6', 's.marmeladov@gmail.com', 'test1234', 'trainee'),
    #   interviewed(declared in related trainee_profile table):
    ('user7', 'p.petrovich@gmail.com', 'test1234', 'trainee'),
    #   hired(declared in related trainee_profile table):
    ('user8', 'p.luzhin@gmail.com', 'test1234', 'trainee')
;