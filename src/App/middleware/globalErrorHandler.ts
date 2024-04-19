/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = 500

    let message = err?.message || 'Something went wrong!';
    let errorMessage: string = ''
    if (err instanceof ZodError) {
        const requiredField = err.issues.map(el => el.path.slice(-1))
        errorMessage = (requiredField.map(el => `${el} is required.`)).join(' ')
        message = "Validation Error"
    } else if (err?.name === "ValidationError") {
        errorMessage = (Object.values(err?.errors).map(val => val?.path)).join(',') + ` is requiried`
    }
    else if (err?.name === 'CastError') {
        errorMessage = err.value + ` is not a valid ID!`
        message = 'Invalid ID'
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: err,
        stack: err?.stack
    })
}

export default globalErrorHandler