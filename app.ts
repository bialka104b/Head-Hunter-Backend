const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
import { globalErrorHandler } from "./utils/globalErrorHandler";
import "./authentication/JwtStrategy";
import { authRouter } from "./routers/authRouter";
const mysql = require("mysql");

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
app.use(cookieParser());

// Conected database
const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
});

pool.getConnection((err: any, connection: any) => {
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
app.use("/auth", authRouter);

// Global error handler:
app.use(globalErrorHandler);

// Assign the PORT 8080 or IP server to our app
app.listen(port, () =>
	console.log(`Server Running on port: http://localhost:${port}`),
);
