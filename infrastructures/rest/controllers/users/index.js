'use strict';

const { user_response_from_dao, user_paginated_from_data } = require("../../../../models/dto/user");
const { validation_error_helper, success_helper, error_helper } = require("../../../../utils/resp_helper");
const { status_code } = require("../../../../consts/consts");
const { validationResult } = require("express-validator");
const { pagination_request_from_req } = require("../../../../models/dto/pagination");
const { email_used_err } = require("../../../../consts/errors");
const UniqueError = require("../../../../errors/uniqueError");

const error_handler = {
    create_update: (res, err) => {
        let code = status_code.internal_status_error

        if (err instanceof UniqueError) {
            code = status_code.conflict
        }

        return error_helper(res, code, err)
    }
}

module.exports = class user_controllers {
    usecases
    resources

    constructor(usecases, resources) {
        this.usecases = usecases
        this.resources = resources
    }

    create = async(req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            const data = await this.usecases.users.create({
                name: req.body.name,
                email: req.body.email
            })

            return success_helper(res, status_code.created, user_response_from_dao(data))
        } catch (error) {
            return error_handler.create_update(res, error)
        }
    }

    update_by_id = async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            const data = await this.usecases.users.update_by_id(req.params.id, {
                name: req.body.name,
                email: req.body.email
            })

            return success_helper(res, status_code.ok, user_response_from_dao(data))
        } catch (error) {
            return error_handler.create_update(res, error)
        }
    }

    get_paginated = async (req, res) => {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return validation_error_helper(res, result.array())
            }

            const data = await this.usecases.users.get_paginated({
                pagination_request: pagination_request_from_req(req),
                filter_request: {
                    name: req.query.name,
                    email: req.query.email,
                },
                order_requests: (req.query.order || "").split(",")
            })

            return success_helper(res, status_code.ok, user_paginated_from_data(data))
        } catch (error) {
            return error_helper(res, status_code.internal_status_error, error)
        }
    }
}