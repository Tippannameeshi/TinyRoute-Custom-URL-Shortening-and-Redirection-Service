import logger from "../config/logger.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import { MESSAGES } from "../constants/messages.js";

const errorHandler = (err, req, res, next) => {

    logger.error(err);

    res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR)

        .json({

            success: false,

            message: err.message || MESSAGES.INTERNAL_SERVER_ERROR

        });

};

export default errorHandler;