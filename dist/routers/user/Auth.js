"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const user_1 = require("../../models/user");
const BaseRoute_1 = require("../BaseRoute");
class Auth extends BaseRoute_1.BaseRoute {
    loginAction(router) {
        router.post('/login', (req, res) => {
            let email = req.body.email;
            const re = /\S+@\S+\.\S+/;
            if (!re.test(email)) {
                res.status(400);
                res.json({
                    success: false,
                    message: 'wrong input.'
                });
                return false;
            }
            user_1.User.findByEmail(email, (err, user) => {
                if (user) {
                    user_1.User.comparePassword(req.body.password, user.password, (err, isMatch) => {
                        if (err) {
                            this.logger.error(err.toString());
                            res.status(500);
                            res.json({
                                success: false,
                                message: 'something went wrong.'
                            });
                        }
                        else if (isMatch) {
                            const token = jwt.sign(user, process.env.APPLICATION_SECRET, {
                                expiresIn: 604800 // 1 week
                            });
                            res.json({
                                success: true,
                                token: token,
                            });
                        }
                        else {
                            res.status(400);
                            res.json({
                                success: false,
                                message: 'wrong credentials.'
                            });
                        }
                    });
                }
                else {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'wrong credentials.'
                    });
                }
            });
        });
    }
    registerAction(router) {
        router.post('/register', (req, res) => {
            const re = /\S+@\S+\.\S+/;
            let name = req.body.name, email = req.body.email, password = req.body.password;
            if (!name || !re.test(email) || !password || password.length < 6) {
                res.status(400);
                res.json({
                    success: false,
                    message: 'wrong input.'
                });
                return false;
            }
            user_1.User.findByEmail(email, (err, user) => {
                if (err) {
                    this.logger.error(err.toString());
                    res.status(500);
                    res.json({
                        success: false,
                        message: 'something went wrong.'
                    });
                }
                else if (!user) {
                    const user = new user_1.User({
                        name: name,
                        email: email,
                        password: password,
                    });
                    user_1.User.createUser(user, (err, user) => {
                        if (err) {
                            this.logger.error(err.toString());
                            res.status(500);
                            res.json({
                                success: false,
                                message: 'something went wrong.'
                            });
                        }
                        else {
                            res.json({
                                success: true,
                                message: 'user created.'
                            });
                        }
                    });
                }
                else {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'this email address has already been taken.'
                    });
                }
            });
        });
    }
    profileAction(router) {
        router.get('/profile', this.guard, (req, res) => {
            res.json({
                success: true,
                user: req.body.user
            });
        });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map