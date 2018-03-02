"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
const index_1 = require("../index");
class BaseTest {
    constructor() {
        this.server = index_1.server.getServerInstance();
        this.route = `/${process.env.API_VERSION}/`;
        this.chai = chai;
        this.chai.use(chaiHttp);
        this.should = chai.should();
    }
}
exports.BaseTest = BaseTest;
//# sourceMappingURL=BaseTest.js.map