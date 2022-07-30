import { pool } from '../../db/pool';
import { unregisterUsers } from './sql';
import { FieldPacket } from 'mysql2';

type unregisterUsersResponse = [{ id: string, email: string, registerToken: string }[], FieldPacket[]]

export class MailRecord {
	static async findUnregisterUsers() {
		const [result] = await pool.execute(unregisterUsers) as unregisterUsersResponse;

		return result.length === 0 ? null : result;
	}
}
