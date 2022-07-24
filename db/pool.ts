import { createPool } from "mysql2/promise";
import {config} from "../config/config";

const { port, host, user, password, database } = config.db;

const pool = createPool({
	port,
	host,
	user,
	password,
	database,
	namedPlaceholders: true,
	decimalNumbers: true,
});

export { pool };
