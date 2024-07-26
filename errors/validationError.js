class ValidationError extends Error {
    constructor(messages) {
        super(messages)

        this.messages = messages

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ValidationError