import {createHmac} from "crypto";
import {config} from "../config/config";

export const hashPassword = (password: string) => {
	const hmac = createHmac("sha512", config.jwt.salt);
	hmac.update(password);
	return hmac.digest("hex");
};
