exports.traineeScore = async (req: any, res: any) => {
	const mysql = require("mysql");

	const pool = mysql.createPool({
		connectionLimit: 100,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		database: process.env.DB_NAME,
	});

	try {
		// Połączenie
		pool.getConnection((err: Error, connection: any) => {
			if (err) throw err;
			console.log("Połączono do bazy z routa traineScore");

			// Query do bazy
			connection.query(
				`SELECT trainee_score.id,
				trainee_score.courseCompletion as courseCompletion,
				trainee_score.courseEngagment,
				trainee_score.projectDegree,
				trainee_score.teamProjectDegree,
				trainee_score.bonusProjectUrls,
				trainee_score.userId,
				trainee_score.createdAt
				FROM trainee_score
                ORDER BY courseCompletion ASC`,
				(err: Error, rows: any) => {
					// Jeśli udane połączenie
					connection.release();
					if (!err) {
						res.status(200).json({
							count: rows.length,
							students: rows,
						});
					} else {
						console.log(err);

						res.json({ message: "Nie znaleziono interviews" });
					}
				},
			);
		});
	} catch (e) {
		console.log(e);
		res.status(404).json({ message: "Error" });
	}
};

