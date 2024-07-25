'use strict';

const { body } = require("express-validator");

module.exports = class user_validators {
    create_validator = () => {
        return [
            body('name').
                isString().withMessage('name must be text').
                exists().withMessage('name must be exist'),
            body('email').
                isString().withMessage('email must be text').
                exists().withMessage('email must be exist'),
        ]
    }

    update_by_id_validator = () => {
        return [
            param("id").
                isInt().withMessage("id must be number"),
            body('name').
                isString().withMessage('name must be text').
                exists().withMessage('name must be exist'),
            body('email').
                isString().withMessage('email must be text').
                exists().withMessage('email must be exist'),
        ]
    }

    get_paginated_validator = () => {
        return [
            body('name').
                isString().withMessage('name must be text'),
            body('email').
                isString().withMessage('email must be text'),
        ]
    }
}