import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
    const data = req.body
    const result = await CategoryServices.createCategoryIntoDB(data)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Category created successfully",
        data: result
    })
})
const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoriesFromBD()
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Categories retrieved successfully",
        data: result
    })
})

export const CategoryControllers = {
    createCategory,
    getAllCategories
}