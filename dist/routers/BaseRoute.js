"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const winston = require("winston");
const guard_1 = require("../middleware/guard");
class BaseRoute {
    constructor() {
        this._registeredMethodEnding = 'Action';
        this.guard = guard_1.guard;
        this.logger = winston;
        this.onInit();
        this.router = express_1.Router();
        this.initRoutes();
    }
    getRoutes() {
        return this.router;
    }
    getRouterMethodNames(obj) {
        let methods = new Set();
        while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj);
            keys.forEach((k) => {
                if (k.toString().indexOf(this._registeredMethodEnding, (k.toString().length - this._registeredMethodEnding.length)) !== -1) {
                    methods.add(k);
                }
            });
        }
        return methods;
    }
    onInit() { }
    initRoutes() {
        const methods = this.getRouterMethodNames(this);
        [...methods].map((method) => {
            this[method](this.router);
        });
    }
}
exports.BaseRoute = BaseRoute;
//# sourceMappingURL=BaseRoute.js.map