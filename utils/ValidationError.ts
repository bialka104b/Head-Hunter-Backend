export class ValidationError extends Error {
	static messages = {
		recordInstanceInit: {
			user: {
				incorrectEmail: 'Incorrect user\'s object data. Email key can not be empty and has to include "@".',
				incorrectPassword: 'Incorrect user\'s object data. Password key can not be empty and has to include 6 characters at list.',
				incorrectRole: 'Incorrect user\'s object data. Allowed roles are: "admin", "hr", "trainee".',
			},
			interview: {
				incorrectRelationId: 'Incorrect interview\'s object data. "HrId" and "traineeId" keys can not be empty and have to match user\'s ids.',
			},
			hrProfile: {
				incorrectNameOrCompany: 'Incorrect hr-profile\'s object data. Please provide data for "fullName" and "company" keys.',
				incorrectRelationId: 'Incorrect hr-profile\'s object data. "UserId" key can not be empty and have to match user\'s ids.',
			},
			traineeScore: {
				incorrectScore: 'Incorrect trainee-score\'s object data. "CourseCompletion", "courseEngagment", "projectDegree", "teamProjectDegree" keys can not be empty and have to be between 0 and 5.',
			},
			traineeProfile: {
				incorrectMinimumData: 'Incorrect trainee-profile\'s object data. "FirstName", "lastName", "githubUsername", "projectUrls" keys can not be empty.',
			},
		},
		login: {
			incorrectData: 'Incorrect email address or password.',
			incorrectEmail: 'Incorrect email. Email can not be empty and has to include "@".',
		},
		fetch: {
			notFound: 'Fetched data not found.',
		},
		auth: {
			passwordIsTheSame: 'New password must be different',
			incorrectPassword: 'Bad Password',
			notAuthorised: 'Unauthorized User',
			incorrectEmail: 'Incorrect email. Email can not be empty and has to include "@".',
			userWithThatEmailNotExist: 'User with that email don\'t exist',
			userWithThatIdNotExist: 'User with that ID don\'t exist',
			incorrectCreatePassword: 'Incorrect Password. Password can not be empty and should be at least 6 characters long'
		},
		interview: {
			id: 'User with that ID don\'t exist',
			statusHired: 'This user is already hired.',
			hrMaxReservedStudents: 'Hr have max reserved of students to interview',
		},
	};
	message: string;
	code: number;

	constructor(message: string, code: number) {
		super();
		this.message = message;
		this.code = code;
	}
}
