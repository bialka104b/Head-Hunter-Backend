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
	namedPlaceholders: true,
});

export const createDatabase = async () => {
	try {
		console.log('DATABASE:');
		await initPool.execute('DROP DATABASE IF EXISTS `m24389_head-hunter`');
		await initPool.execute(`DROP DATABASE IF EXISTS ${config.db.database}`);
		console.log(`\t✔ ${config.db.database} database dropped`);
		await initPool.execute(`CREATE DATABASE IF NOT EXISTS ${config.db.database}
		CHARACTER SET utf8mb4
		COLLATE utf8mb4_unicode_ci`);
		console.log(`\t✔ ${config.db.database} database created`);
		initPool.end();
	} catch (e) {
		throw e;
	}
};
