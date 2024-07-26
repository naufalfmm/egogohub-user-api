'use strict';

const NotFoundError = require("../errors/notFoundError");
const UniqueError = require("../errors/uniqueError");

module.exports = {
    user_missing_err: new NotFoundError("user missing"),
    email_used_err: new UniqueError("email has been used")
}