import * as express from "express";
import { globalErrorHandler } from "./utils/globalErrorHandler";
const mysql = require("mysql");
const cors = require("cors");

require("dotenv").config();

// Middleware
const app = express();
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
	}),
);
const port = process.env.PORT || 8080;

// Apply CORS policy
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conected database
const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
	if (err) {
		console.log("Niudane połączenie do bazy", err);
		throw err;
	}
	console.log('Podłączono do bazy "' + process.env.DB_NAME + '"');
});

// Import Router
const productsRouter = require("./server/routes/students.js");

// Use Routes
app.use("/api/", productsRouter);

// Global error handler:
app.use(globalErrorHandler);

// Assign the PORT 8080 or IP server to our app
app.listen(port, () => console.log(`Server Running on port: http://localhost:${port}`));
