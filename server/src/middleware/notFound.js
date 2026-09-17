import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";

const notFound = (req, res) => {

    res.status(HTTP_STATUS.NOT_FOUND).json({

        success: false,

        message: MESSAGES.ROUTE_NOT_FOUND

    });

};

export default notFound;