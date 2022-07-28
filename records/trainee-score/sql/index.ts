export const insertMe =
	`
		INSERT INTO trainee_score
		VALUES (:id, :courseCompletion, :courseEngagment,
				:projectDegree, :teamProjectDegree,
				:bonusProjectUrls, :userId, :createdAt)
	`
;

export const updateMe =
	`
		UPDATE trainee_score
		SET courseCompletion  = :courseCompletion,
			courseEngagment   = :courseEngagment,
			projectDegree     = :projectDegree,
			teamProjectDegree = :teamProjectDegree,
			bonusProjectUrls  = :bonusProjectUrls,
			userId            = :userId
		WHERE id = :id
	`
;

export const getAllTraineeScore =
	`
		SELECT *
		FROM trainee_score;
	`
;

export const getTraineeScoreById =
	`
		SELECT *
		FROM trainee_score
		WHERE id = :id;
	`;
