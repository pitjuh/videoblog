"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
/**
 * http(s) middleware guard
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 * @returns {Response}
 */
exports.guard = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.APPLICATION_SECRET, (err, user) => {
            if (err) {
                console.error(err);
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            }
            else {
                req.body.user = user._doc;
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};
//# sourceMappingURL=guard.js.map