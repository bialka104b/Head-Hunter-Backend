import { createTables } from './src/create-tables';
import { createDatabase } from './src/create-db';
import { insertDummyData } from './src/insert-dummy';

(async () => {
	await createDatabase();
	await createTables();
	await insertDummyData();
})();
