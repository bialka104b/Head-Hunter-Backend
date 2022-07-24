const mysql = require("mysql");

// Pool do bazy
const pool = mysql.createPool({
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
});

exports.traineeProfile = async (req, res) => {
	try {
		// Połączenie
		pool.getConnection((err, connection) => {
			if (err) throw err;
			console.log("Połączono do bazy z routa traineeProfile");

			// Query do bazy
			connection.query(
				`SELECT trainee_profile.id,
                trainee_profile.tel,
                trainee_profile.firstName,
                trainee_profile.lastName as lastName,
                trainee_profile.githubUsername,
                trainee_profile.portfolioUrls,
                trainee_profile.projectUrls,
                trainee_profile.bio,
                trainee_profile.expectedTypeWork,
                trainee_profile.targetWorkCity,
                trainee_profile.expectedContractType,
                trainee_profile.expectedSalary,
                trainee_profile.canTakeApprenticeship,
                trainee_profile.monthsOfCommercialExp,
                trainee_profile.education,
                trainee_profile.workExperience,
                trainee_profile.courses,
                trainee_profile.registrationUrl,
                trainee_profile.userId,
                trainee_profile.createdAt
                FROM trainee_profile
                ORDER BY lastName ASC`,
				(err, rows) => {
					// Jeśli udane połączenie
					connection.release();
					if (!err) {
						res.status(200).json({
							count: rows.length,
							students: rows,
						});
					} else {
						res.json({ message: "Nie znaleziono profilu  kursanta" });
					}
				},
			);
		});
	} catch (e) {
		console.log(e);
		res.status(404).json({ message: "Error" });
	}
};
