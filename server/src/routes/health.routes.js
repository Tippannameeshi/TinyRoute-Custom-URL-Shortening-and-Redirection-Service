import { Router } from "express";

import ApiResponse from "../utils/ApiResponse.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import { MESSAGES } from "../constants/messages.js";

const router = Router();

router.get("/", (req, res) => {

    return res.status(HTTP_STATUS.OK)

        .json(

            new ApiResponse(

                HTTP_STATUS.OK,

                MESSAGES.SERVER_RUNNING,

                {

                    timestamp: new Date().toISOString()

                }

            )

        );

});

export default router;