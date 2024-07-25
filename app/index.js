'use strict';

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const { initialize_resources } = require("../resources");
const { initialize_model } = require("../models/dao");
const user_repositories = require("../persistents/repositories/users");
const repositories = require("../persistents/repositories");
const persistents = require("../persistents");
const user_usecases = require("../usecases/users");
const usecases = require("../usecases");
const user_controllers = require("../infrastructures/rest/controllers/users");
const controllers = require("../infrastructures/rest/controllers");
const validators = require("../validators");
const user_validators = require("../validators/users");
const infrastructures = require("../infrastructures");

module.exports.initialize_app = async () => {
    const app = express()
    
    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    const resr = await initialize_resources()

    app.set("port", (resr.config.port || 8080))

    initialize_model(resr.pgsql.sequelize_orm)

    const user_repo = new user_repositories(resr);
    const repo = new repositories(user_repo);

    const persist = new persistents(repo)

    const user_usc = new user_usecases(persist, resr)
    const usc = new usecases(user_usc)

    const user_ctl = new user_controllers(usc, resr)
    const ctl = new controllers(user_ctl)

    const vld = new validators(new user_validators())

    const infr = new infrastructures(ctl, vld)
    infr.register(app)

    return app
}