import { Response } from "express"

export type TResponse<T> = {
    statusCode: number
    success: boolean
    message?: string
    data: T,
}


export const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
    res.status(payload.statusCode).json({
        success: payload.success,
        statusCode: payload.statusCode,
        message: payload.message,
        data: payload.data
    })
}