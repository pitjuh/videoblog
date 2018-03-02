"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * application main router
 */
const express = require("express");
const user_1 = require("./user");
const api = express.Router();
api.use('/user', user_1.default);
exports.default = api;
//# sourceMappingURL=index.js.map