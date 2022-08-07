import { createTables } from './src/create-tables';
import { createDatabase } from './src/create-db';
import { insertDummyData } from './src/insert-dummy';
import { pool } from '../pool';

(async () => {
	try {
		await createDatabase();
		await createTables();
		await insertDummyData();
	} catch (e) {
		if (e.code === 'ECONNREFUSED')
			console.log("Can't connect to database.");
		else console.log(e);
	} finally {
		pool.end();
	}
})();
