import {
	TraineeProfileRecord
} from './records/trainee-profie/trainee-profile.record';

(async () => {
	const res = await TraineeProfileRecord.getFullTraineeInfo('user5')
	console.log(res);
})();
