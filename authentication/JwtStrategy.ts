import {Strategy} from "passport-jwt";
import {Request} from "express";
import * as passport from "passport";

const cookieExtractor = function(req: Request): null | string {
    let token = null;
    if (req && req.cookies?.jwt)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: "asd", //@TODO napisać jakiś prawdziwy secretKey
    expiresIn: 60 * 60 * 24
}

export const JwtStrategy = new Strategy(opts, async (jwt_payload, done: (error: Error | null, user: string | boolean) => void) => {
    if(!jwt_payload || !jwt_payload.email) {
        return done(new Error("unauthorized User"), false)
    }
    const user = "asd" //@TODO zrobić wysszukiwanie usera w bazie danych

    if(!user) {
        return done(new Error("nie ma usera"), false)
    }
    done(null, user)
});

passport.use(JwtStrategy)
