export interface Config {
	app: {
		host: string;
		port: number;
	};
	frontend: {
		host: string;
	};
	db: {
		port: number;
		host: string;
		user: string;
		password: string;
		database: string;
	};
	jwt: {
		passportSecretOrKey: string;
		salt: string;
	};
	email: {
		email: string;
		pass: string;
	};
	demo: {
		users: string[];
	};
}
