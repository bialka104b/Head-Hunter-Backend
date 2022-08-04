export const insertMe =
	`INSERT INTO interviews (id, hrId, traineeId, scheduledFor, createdAt, isActive)
	 VALUES (:id, :hrId, :traineeId, :scheduledFor, :createdAt,
			 :isActive)
	`
;

export const getAllInterviews =
	`
		SELECT *
		FROM interviews
		WHERE isActive = true
	`
;

export const getInterviewById =
	`
		SELECT *
		FROM interviews
		WHERE id = :id
	`
;

export const updateMe =
	`    UPDATE interviews
		 SET hrId         = :hrId,
			 traineeId    = :traineeId,
			 scheduledFor = :scheduledFor
		 WHERE id = :id
	`
;

export const deleteInterviewById =
	`
		UPDATE interviews
		SET isActive = false
		WHERE traineeId = :id
	`
;

export const getTraineesInterviewsListByHrId =
	`
	SELECT traineeId
	FROM interviews
	WHERE hrId = :id
		AND isActive = true
		LIMIT :limit
		OFFSET :offsetElement
	`
;

export const getCountOfTraineesInterviewsForHr =
	`
		SELECT COUNT(*) as count
		FROM interviews
		WHERE hrId = :hrId
	`
;
