import { UserRecord } from './records/user/user.record';
import { UserRole } from './types/user/user';

const obj = {
	email: '@',
	password: 'test1234',
	role: UserRole.hr,
};

const user = new UserRecord(obj);
console.log(user);
// (async () => {
// 	const target = await UserRecord.getAllUsers();
// 	console.log(target);
// })();

