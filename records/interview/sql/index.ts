export const insertMe = `INSERT INTO interviews (id, hrId, traineeId, scheduledFor, createdAt, isActive)
	 VALUES (:id, :hrId, :traineeId, :scheduledFor, :createdAt,
			 :isActive)
	`;

export const getAllInterviews = `
		SELECT *
		FROM interviews
		WHERE isActive = true
	`;

export const getInterviewById = `
		SELECT *
		FROM interviews
		WHERE traineeId = :traineeId
	`;

export const updateMe = `    UPDATE interviews
		 SET hrId         = :hrId,
			 traineeId    = :traineeId,
			 scheduledFor = :scheduledFor
		 WHERE id = :id
	`;

export const deleteInterviewById = `
		UPDATE interviews
		SET isActive = false
		WHERE hrId = :hrId
		AND traineeId = :traineeId
	`;

export const deleteTraineeFromInterviewTable = `
		UPDATE interviews
		SET isActive = false
		WHERE traineeId = :traineeId
	`;

export const getTraineesInterviewsListByHrId = `
	SELECT traineeId
	FROM interviews
	WHERE hrId = :id
		AND isActive = true
		LIMIT :limit
		OFFSET :offsetElement
	`;

export const getCountOfTraineesInterviewsForHr = `
		SELECT COUNT(*) as count
		FROM interviews
		WHERE hrId = :hrId
			AND isActive = true
	`;

export const getTraineesInterviewIfExists = `
	SELECT *
	FROM interviews
	WHERE hrId = :hrId
		AND traineeId = :traineeId
`;

export const setInterviewActive = `UPDATE interviews
		 SET isActive = true
		 WHERE id = :id
	`;
