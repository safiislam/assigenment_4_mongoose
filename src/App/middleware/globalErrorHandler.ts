/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = 500

    let message = err.message || 'something is wrong'


    // if (err instanceof ZodError) {
    //     const simpliphyedError =
    // }

    res.status(statusCode).json({
        success: false,
        message: err?.message,
        errorDetails: err,
        stack: err?.stack
    })
}

export default globalErrorHandler