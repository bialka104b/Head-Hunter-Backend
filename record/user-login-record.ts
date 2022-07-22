import {sign} from "jsonwebtoken";
import {UserLogin} from "../types/user/user";
import {pool} from "../db/pool";


//@TODO jak już będzie baza danych to otypować wszystko
export class UserLoginRecord implements UserLogin {
	email: string;
	password: string;

	constructor(obj: UserLogin) {
		if (!obj.email.includes("@")) {
			throw new Error("Email must includes the @ sign.");
		}
		this.email = obj.email;
		this.password = obj.password;
	}

	async login() {
		const [result] = await pool.execute("SELECT `id`, `email`, `password` FROM `users` WHERE `email` = :email AND `isActive` = :isActive", {
			email: this.email,
			isActive: true,
		});

		if (!result[0]) {
			return {
				isLogin: false,
				message: "Not User Found. Possible that your status is non active."
			};
		}

		//@TODO wykorzystać funkcję hashującą i porównywać zhashowane hasła
		if (result[0].password !== this.password) {
			return {
				isLogin: false,
				message: "Bad Password"
			};
		}

		const payload = {
			email: this.email,
			id: result[0].id,
		};

		const token = sign(payload, "asd", {expiresIn: 60 * 60 * 24});

		return {
			isLogin: true,
			token
		};
	}
}
