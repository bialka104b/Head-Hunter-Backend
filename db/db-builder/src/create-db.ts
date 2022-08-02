import fs from 'fs';
import path from 'path';
import { createPool } from 'mysql2/promise';
import { config } from '../../../config/config';

const { port, host, user, password } = config.db;

const initPool = createPool({
	port,
	host,
	user,
	password,
});

const createDb = fs.readFileSync(path.resolve('db/sql/00-create-db.sql')).toString();

export const createDatabase = async () => {
	const dbName = (createDb.split('CREATE DATABASE IF NOT EXISTS '))[1].split('\r\n')[0];
	try {
		console.log('DATABASE:');
		await initPool.execute(`DROP DATABASE IF EXISTS ${dbName}`);
		console.log(`\t✔ ${dbName} database dropped`);
		await initPool.execute(createDb);
		console.log(`\t✔ ${dbName} database created`);
	} catch (e) {
		console.log(e);
	}
};
