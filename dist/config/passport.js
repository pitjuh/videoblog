"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../models/user");
/**
 * passport jwt configuration
 */
class PassportConfig {
    constructor(passport) {
        this.passport = passport;
    }
    init() {
        let opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(),
            secretOrKey: process.env.APPLICATION_SECRET
        };
        this.passport.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => {
            user_1.User.findOne({ _id: jwtPayload._doc._id }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                else if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            });
        }));
    }
}
exports.PassportConfig = PassportConfig;
//# sourceMappingURL=passport.js.map