"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const routers_1 = require("./routers");
const passport_1 = require("./config/passport");
class App {
    constructor() {
        this.setEnvironment();
        this.express = express();
        this.database();
        this.middleware();
        this.routes();
    }
    /**
     * database connection
     */
    database() {
        mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
        mongoose.connection.on('error', () => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.');
            process.exit();
        });
    }
    /**
     * http(s) request middleware
     */
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*'); // dev only
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            if (req.method === 'OPTIONS') {
                res.status(200).send();
            }
            else {
                next();
            }
        });
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        const pConfig = new passport_1.PassportConfig(passport);
        pConfig.init();
    }
    /**
     * app environment configuration
     */
    setEnvironment() {
        dotenv.config({ path: '.env' });
    }
    /**
     * API main v1 routes
     */
    routes() {
        this.express.use('/v1', routers_1.default);
        this.express.use('/', (req, res) => {
            res.status(404).send({ error: `path doesn't exist` });
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map