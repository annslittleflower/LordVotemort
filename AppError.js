'use strict';

const AppError = class extends Error {
    constructor(httpStatus, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.httpStatus = httpStatus;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

module.exports = AppError;
