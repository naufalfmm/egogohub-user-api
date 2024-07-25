'use strict'

const rest = require("./rest")

module.exports = class infrastructures {
    rest

    constructor(controller, validator) {
        this.rest = new rest(controller, validator)
    }

    register = (app) => {
        this.rest.register(app)
    }
}