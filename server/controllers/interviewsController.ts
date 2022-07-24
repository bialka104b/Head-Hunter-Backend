exports.interviews = async (req: any, res: any) => {
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
			console.log("Połączono do bazy z routa interviews");

			// Query do bazy
			connection.query(
				`SELECT interviews.id,
				interviews.traineeId as traineeId,
				interviews.scheduledFor,
				interviews.createdAt,
				interviews.isActive,
				interviews.hrId
				FROM interviews
                ORDER BY traineeId ASC`,
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
