exports.hrProfile = async (req: any, res: any) => {
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
			console.log("Połączono do bazy z routa hr");

			// Query do bazy
			connection.query(
				`SELECT hr_profile.id,
                hr_profile.fullName as fullName,
                hr_profile.company,
                hr_profile.maxReservedStudents,
                hr_profile.userId,
                hr_profile.createdAt
                FROM hr_profile
                ORDER BY fullName ASC`,
				(err: Error, rows: any) => {
					// Jeśli udane połączenie
					connection.release();
					if (!err) {
						res.status(200).json({
							count: rows.length,
							students: rows,
						});
					} else {
						res.json({ message: "Nie znaleziono pracownika HR" });
					}
				},
			);
		});
	} catch (e) {
		console.log(e);
		res.status(404).json({ message: "Error" });
	}
};
