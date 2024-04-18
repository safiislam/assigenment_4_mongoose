import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";



const createReview = catchAsync(async (req, res) => {
    const data = req.body
    const result = await ReviewServices.createReviewIntoDB(data)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Review created successfully ",
        data: result
    })
})

export const ReviewControllers = {
    createReview
}