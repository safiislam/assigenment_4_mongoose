/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = 500

    res.status(statusCode).json({
        success: false,
        message: err?.message,
        errorDetails: err,
        stack: err?.stack
    })
}

export default globalErrorHandler