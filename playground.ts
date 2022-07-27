import { InterviewRecord } from './records/interview/interview.record';
import {
	HrProfileRecord,
} from './records/hr-profile/hr-profile.record';

const obj = {
	// id: 'id1234',
	fullName: 'Tester Testowy',
	company: 'TestCompanyInternational',
	userId: 'user1',
	// maxReservedStudents: 1;
	// createdAt: Date;
};

const newHrProfile = new HrProfileRecord(obj);


(async () => {
	// await newHrProfile.insertMe();
	const x = await HrProfileRecord.getHrProfileById('hrProfile1');
	x.company = 'zmiana!';
	await x.updateMe();
	console.log(x);
})();

