exports.students = async (req: any, res: any) => {
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
			console.log("Połączono do bazy z routa");

			let page =
				req.query.page != undefined && req.query.page > 0
					? parseInt(req.query.page)
					: 1;
			const limit =
				req.query.limit != undefined && req.query.limit > 0
					? parseInt(req.query.limit)
					: 12;
			const offset = (page - 1) * limit;
			let numOfstudents: any;

			connection.query(
				`SELECT COUNT(*) as count FROM users`,
				(err: Error, countQuery: any) => {
					if (!err) {
						numOfstudents = countQuery[0].count;
					} else {
						console.log(err);
					}
				},
			);

			// Query do bazy
			connection.query(
				`SELECT users.id,
                users.email,
                users.password,
                users.role,
                users.createdAt,
                users.isActive
                FROM users
                LIMIT ?
                OFFSET ?`,
				[limit, offset],
				(err: Error, rows: any) => {
					// Jeśli udane połączenie
					connection.release();
					if (!err) {
						let numOfPages: Number = Math.ceil(
							numOfstudents / limit,
						);
						res.status(200).json({
							count: rows.length,
							limit: limit,
							totalstudents: numOfstudents,
							currentPage: page,
							totalPages: numOfPages,
							students: rows,
						});
					} else {
						res.json({ message: "Nie znaleziono produktów" });
					}
					//console.log('Znalezione dane z bazy: \n', rows)
				},
			);
		});
	} catch (e) {
		console.log(e, "dupa");
		res.status(404).json({ message: "Error" });
	}
};

// Lista wszystkich produktow pod kalkulator
// exports.allstudents = async (req, res) => {
// 	try {
// 		// Połączenie
// 		pool.getConnection((err, connection) => {
// 			if (err) throw err;
// 			console.log("Połączono do bazy z routa");

// 			// Query do bazy
// 			connection.query(
// 				`SELECT produkty.id,
//                 produkty.nazwa as nazwa,
//                 produkty.kalorie,
//                 produkty.kj,
//                 produkty.bialko,
//                 produkty.tluszcz,
//                 produkty.weglowodany,
//                 produkty.blonnik,
//                 produkty.ig,
//                 produkty.img,
//                 produkty.opis,
//                 kategorie.nazwa as kategoria
//                 FROM produkty
//                 JOIN kategorie
//                 ON produkty.id_kategorii = kategorie.id
//                 ORDER BY nazwa ASC`,
// 				(err, rows) => {
// 					// Jeśli udane połączenie
// 					connection.release();
// 					if (!err) {
// 						res.status(200).json({
// 							count: rows.length,
// 							students: rows,
// 						});
// 					} else {
// 						res.json({ message: "Nie znaleziono produktów" });
// 					}
// 					//console.log('Znalezione dane z bazy: \n', rows)
// 				},
// 			);
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		res.status(404).json({ message: "Error" });
// 	}
// };

// Wyszukiwanie produktu
// exports.find = async (req, res) => {
// 	try {
// 		pool.getConnection((err, connection) => {
// 			if (err) throw err;
// 			console.log("Połączono do bazy z routa find");

// 			let page =
// 				req.query.page != undefined && req.query.page > 0 ? parseInt(req.query.page) : 1;
// 			const limit =
// 				req.query.limit != undefined && req.query.limit > 0
// 					? parseInt(req.query.limit)
// 					: 12;
// 			const offset = (page - 1) * limit;
// 			let numOfstudents;
// 			let searchPhrase = req.body.searchInput;

// 			connection.query(
// 				`SELECT COUNT(*) as count
//             FROM produkty
//             JOIN kategorie
//             ON produkty.id_kategorii = kategorie.id
//             WHERE produkty.nazwa LIKE ?`,
// 				["%" + searchPhrase + "%"],
// 				(err, countQuery) => {
// 					if (!err) {
// 						numOfstudents = countQuery[0].count;
// 					} else {
// 						console.log(err);
// 					}
// 				},
// 			);

// 			if (searchPhrase.length >= 2) {
// 				connection.query(
// 					`SELECT produkty.id,
//                     produkty.nazwa as nazwa,
//                     produkty.opis,
//                     produkty.kalorie,
//                     produkty.kj,
//                     produkty.bialko,
//                     produkty.tluszcz,
//                     produkty.weglowodany,
//                     produkty.blonnik,
//                     produkty.iG,
//                     produkty.img,
//                     kategorie.nazwa as kategoria
//                     FROM produkty
//                     JOIN kategorie
//                     ON produkty.id_kategorii = kategorie.id
//                     WHERE produkty.nazwa LIKE ?
//                     ORDER BY nazwa ASC
//                     LIMIT ?
//                     OFFSET ?`,
// 					["%" + searchPhrase + "%", limit, offset],
// 					(err, rows) => {
// 						// Jeśli udane połączenie
// 						connection.release();
// 						if (!err) {
// 							let numOfPages = Math.ceil(numOfstudents / limit);
// 							res.status(200).json({
// 								count: rows.length,
// 								limit: limit,
// 								totalstudents: numOfstudents,
// 								currentPage: page,
// 								totalPages: numOfPages,
// 								students: rows,
// 							});
// 						} else {
// 							console.log(err);
// 						}
// 						//console.log("Znalezione dane z bazy: \n", rows);
// 					},
// 				);
// 			} else {
// 				res.json({ message: "Nazwa szukanego produktu jest za krótka" });
// 			}
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		res.status(404).json({ message: "Error" });
// 	}
// };

// Lista 4 najnowszych produktów
// exports.newstudents = async (req, res) => {
// 	try {
// 		// Połączenie
// 		pool.getConnection((err, connection) => {
// 			if (err) throw err;
// 			console.log("Połączono do bazy z routa");

// 			// Query do bazy
// 			connection.query(
// 				`SELECT produkty.id,
//                 produkty.nazwa as nazwa,
//                 produkty.kalorie,
//                 produkty.kj,
//                 produkty.bialko,
//                 produkty.tluszcz,
//                 produkty.weglowodany,
//                 produkty.blonnik,
//                 produkty.ig,
//                 produkty.img,
//                 kategorie.nazwa as kategoria
//                 FROM produkty
//                 JOIN kategorie
//                 ON produkty.id_kategorii = kategorie.id
//                 ORDER BY id DESC
//                 LIMIT 4`,
// 				(err, rows) => {
// 					// Jeśli udane połączenie
// 					connection.release();
// 					if (!err) {
// 						res.status(200).json({
// 							count: rows.length,
// 							students: rows,
// 						});
// 					} else {
// 						res.json({ message: "Nie znaleziono produktów" });
// 					}
// 					//console.log('Znalezione dane z bazy: \n', rows)
// 				},
// 			);
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		res.status(404).json({ message: "Error" });
// 	}
// };

// Pojedynczy produkt
// exports.singleProduct = async (req, res) => {
// 	try {
// 		pool.getConnection((err, connection) => {
// 			if (err) throw err;
// 			console.log("Połączono do bazy z routa");

// 			// Query
// 			connection.query(
// 				`SELECT produkty.id,
//                 produkty.nazwa as nazwa,
//                 produkty.opis,
//                 produkty.kalorie,
//                 produkty.kj,
//                 produkty.bialko,
//                 produkty.tluszcz,
//                 produkty.weglowodany,
//                 produkty.blonnik,
//                 produkty.ig,
//                 produkty.img,
//                 kategorie.nazwa as kategoria
//                 FROM produkty
//                 JOIN kategorie
//                 ON produkty.id_kategorii = kategorie.id
//                 WHERE produkty.id=?`,
// 				[req.params.id],
// 				(err, rows) => {
// 					connection.release();
// 					if (!err && rows.length > 0) {
// 						res.status(200).json({ students: rows });
// 					} else {
// 						res.json({ message: "Nie znaleziono tego produktu" });
// 					}
// 					//console.log('Znalezione dane z bazy dla pojedycznego produktu: \n', rows)
// 				},
// 			);
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		res.status(404).json({ message: "Error" });
// 	}
// };

// Lista kategorii
// exports.categories = async (req, res) => {
// 	try {
// 		pool.getConnection((err, connection) => {
// 			if (err) throw err;
// 			console.log("Połączono do bazy z routa listy kategorii");

// 			// Query
// 			connection.query(
// 				`SELECT kategorie.id,
//                 kategorie.nazwa
//                 FROM kategorie`,
// 				(err, rows) => {
// 					connection.release();
// 					if (!err) {
// 						res.status(200).json({
// 							count: rows.length,
// 							categories: rows,
// 						});
// 					} else {
// 						console.log(err);
// 					}
// 					//console.log("Znalezione dane z bazy: \n", rows);
// 				},
// 			);
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		res.status(404).json({ message: "Error" });
// 	}
// };

// Wszystkie produkty z danej kategorii
// exports.category = async (req, res) => {
// 	try {
// 		pool.getConnection((err, connection) => {
// 			if (err) throw err;
// 			console.log("Połączono do bazy z routa kategorii");

// 			let page =
// 				req.query.page != undefined && req.query.page > 0 ? parseInt(req.query.page) : 1;
// 			const limit =
// 				req.query.limit != undefined && req.query.limit > 0
// 					? parseInt(req.query.limit)
// 					: 12;
// 			const offset = (page - 1) * limit;
// 			let numOfstudents;
// 			let categoryName = req.params.category;

// 			connection.query(
// 				`SELECT COUNT(*) as count
//             FROM produkty
//             JOIN kategorie
//             ON produkty.id_kategorii = kategorie.id
//             WHERE kategorie.nazwa LIKE ?`,
// 				["%" + categoryName + "%"],
// 				(err, countQuery) => {
// 					if (!err) {
// 						numOfstudents = countQuery[0].count;
// 					} else {
// 						console.log(err);
// 					}
// 				},
// 			);

// 			// Query
// 			connection.query(
// 				`SELECT produkty.id,
//                 produkty.nazwa as nazwa,
//                 produkty.opis,
//                 produkty.kalorie,
//                 produkty.kj,
//                 produkty.bialko,
//                 produkty.tluszcz,
//                 produkty.weglowodany,
//                 produkty.blonnik,
//                 produkty.ig,
//                 produkty.img,
//                 kategorie.nazwa as kategoria
//                 FROM produkty
//                 JOIN kategorie
//                 ON produkty.id_kategorii = kategorie.id
//                 WHERE kategorie.nazwa LIKE ?
//                 ORDER BY nazwa ASC
//                 LIMIT ?
//                 OFFSET ?`,
// 				["%" + categoryName + "%", limit, offset],
// 				(err, rows) => {
// 					// Jeśli udane połączenie
// 					connection.release();
// 					if (!err) {
// 						let numOfPages = Math.ceil(numOfstudents / limit);
// 						res.status(200).json({
// 							count: rows.length,
// 							limit: limit,
// 							totalstudents: numOfstudents,
// 							currentPage: page,
// 							totalPages: numOfPages,
// 							students: rows,
// 						});
// 					} else {
// 						console.log(err);
// 					}
// 					//console.log("Znalezione dane z bazy: \n", rows);
// 				},
// 			);
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		res.status(404).json({ message: "Error" });
// 	}
// };
