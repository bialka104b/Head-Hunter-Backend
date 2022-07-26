export class ValidationError extends Error {
	message: string;
	code: number;

	constructor(message: string, code: number) {
		super();
		this.message = message;
		this.code = code;
	}

	static messages = {
		userRecordInstanceInit: {
				incorrectEmail: 'Incorrect user\'s object data. Email key can not be empty and has to include "@".',
				incorrectPassword: 'Incorrect user\'s object data. Password key can not be empty and has to include 6 characters at list.',
				incorrectRole: 'Incorrect user\'s object data. Allowed roles are: "admin", "hr", "trainee".',
		},
		login: {
			incorrectData: 'Incorrect email address or password.',
		},
		fetch: {
			notFound: 'Fetched data not found.',
		},
		auth: {
			notAuthorised: 'Please log in.',
		},
	};
}
