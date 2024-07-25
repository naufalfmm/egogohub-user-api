'use strict'

module.exports = class routes {
    controllers
    validators

    constructor(controllers, validators) {
        this.controllers = controllers
        this.validators = validators
    }

    register = (app) => {
        app.get("/", (_, res) => {
            return res.status(200).json({
                ok: true,
                data: "success"
            })
        })

        app.post("/users", this.validators.users.create_validator(), this.controllers.users.create)
        app.get("/users", this.validators.users.get_paginated_validator(), this.controllers.users.get_paginated)
        app.put("/users/:id", this.validators.users.create_validator(), this.controllers.users.update_by_id)
    }
}