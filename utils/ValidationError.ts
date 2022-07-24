export class ValidationError extends Error {
	message: string;
	code: number;

	constructor(message: string, code: number) {
		super();
		this.message = message;
		this.code = code;
	}

	static messages = {
		login: {
			incorrectData: "Incorrect email address or password.",
		},
		fetch: {
			notFound: "Fetched data not found.",
		},
		auth: {
			notAuthorised: "Please log in.",
		},
	};
}
