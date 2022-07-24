import * as express from "express";
const cors = require("cors");
import { config } from "./config/config";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import { ValidationError } from "./utils/ValidationError";
import { createPool } from "mysql2/promise";
import { studentsRoutes } from "./routes/students";

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conected database
const pool = createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

// pool.getConnection((err, connection) => {
//   if (err) {
//     console.log("Niudane połączenie do bazy", err);
//     throw err;
//   }
//   console.log('Podłączono do bazy "' + process.env.DB_NAME + '"');
// });

// Use Routes
app.use("/api/", studentsRoutes);

app.get("*", async (req, res) => {
  throw new ValidationError("Not founds.", 404);
});

// Global error handler:
app.use(globalErrorHandler);

// Assign the PORT 8080 or IP server to our app
const port = config.app.port || 8080;
app.listen(port, () =>
  console.log(`Server Running on port: http://localhost:${port}`)
);
