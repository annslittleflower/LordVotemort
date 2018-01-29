'use strict';

module.exports = async function (ctx, next) {
    try {
        await next();
    } catch (err) {
        console.log(
            "[AppError]",
            err.httpStatus,
            err.message
        );
        if (err.httpStatus && err.httpStatus >= 400 && err.httpStatus < 500) {
            ctx.status = err.httpStatus;
            ctx.body = {
                error: {
                    message: err.message
                }
            };
        } else {
            ctx.status = 500;
            ctx.body = {
                error: {
                    message: "Server error"
                }
            };
        }
    }
};

