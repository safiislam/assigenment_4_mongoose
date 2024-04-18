/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        success: false,
        message: "Api is not Found",
        error: {}
    })
}

export default notFound