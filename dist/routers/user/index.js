"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * user router
 */
const express = require("express");
const Auth_1 = require("./Auth");
const user = express.Router();
user.use('/auth', new Auth_1.Auth().getRoutes());
exports.default = user;
//# sourceMappingURL=index.js.map