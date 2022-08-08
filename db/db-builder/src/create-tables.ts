import { pool } from '../../pool';
import fs from 'fs';
import path from 'path';

const usersTable = fs
	.readFileSync(path.resolve('db/sql/01-create-table-users.sql'))
	.toString();
const traineeScoreTable = fs
	.readFileSync(path.resolve('db/sql/02-create-table-trainee-score.sql'))
	.toString();
const hrProfileTable = fs
	.readFileSync(path.resolve('db/sql/03-create-table-hr-profile.sql'))
	.toString();
const traineeProfileTable = fs
	.readFileSync(path.resolve('db/sql/04-create-table-trainee-profile.sql'))
	.toString();
const interviewsTable = fs
	.readFileSync(path.resolve('db/sql/05-create-table-interviews.sql'))
	.toString();

const tables: string[] = [
	usersTable,
	traineeScoreTable,
	hrProfileTable,
	traineeProfileTable,
	interviewsTable,
];

export const createTables = async () => {
	console.log('TABLES:');
	try {
		for (const table of tables) {
			await pool.execute(table);
			const tableName = table
				.split('CREATE TABLE')[1]
				.split('\r\n')[0]
				.split(' ')[1];
			console.log(`\t✔ ${tableName} table created`);
		}
	} catch (e) {
		throw e;
	}
};
