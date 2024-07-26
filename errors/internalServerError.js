class InternalServerError extends Error {
    constructor(message) {
        super((message || "internal server error"))

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = InternalServerError