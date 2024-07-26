'use strict';

const { status_code } = require("../../consts/consts");
const ValidationError = require("../../errors/validationError");

module.exports.success_helper = (res, code, data) => {
    if (data instanceof Array) {
        return res.status(code).json({
            ok: true,
            message: 'Success',
            data: {
                items: data
            }
        })
    }

    return res.status(code).json({
        ok: true,
        message: 'Success',
        data: data
    })
}

module.exports.error_helper = (res, code, err) => {
    return res.status(code).json({
        ok: false,
        message: err.name,
        data: {
            error: (err.messages || err.message)
        }
    })
}

module.exports.validation_error_helper = (res, val_errs) => {
    let errs = []
    for (let i = 0; i < val_errs.length; i++) {
        errs.push(`${val_errs[i].path}: ${val_errs[i].msg}`)
    }

    return this.error_helper(res, status_code.bad_request, new ValidationError(errs))
}