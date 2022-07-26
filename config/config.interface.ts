export interface Config {
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
}
