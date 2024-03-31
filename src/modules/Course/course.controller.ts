import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { CourseServices } from "./course.service";


const createCourse = catchAsync(async (req, res) => {
    const { course } = req.body
    const result = await CourseServices.createCourseIntoDB(course)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Course created successfully",
        data: result
    })
})
const getAllCourse = catchAsync(async (req, res) => {
    const query = req.query
    const result = await CourseServices.getAllCourseFromDB(query)
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Courses retrieved successfully",
        meta: {
            "page": Number(query?.page) | 1,
            "limit": Number(query?.limit) | 10,
            "total": result.length
        },
        data: result
    })
})

const updateCosurse = catchAsync(async (req, res) => {
    const { courseId } = req.params
    const data = req.body
    const result = await CourseServices.updateCosurseFromBD(courseId, data)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course updated successfully",
        data: result
    })
})
const getCourseReview = catchAsync(async (req, res) => {
    const { courseId } = req.params
    const result = await CourseServices.getCourseReviewFromDB(courseId)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course and Reviews retrieved successfully",
        data: result
    })
})
const getBestCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.getBestCourseFromDB()
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Best course retrieved successfully",
        data: result
    })
})


export const CourseControllers = {
    createCourse,
    getAllCourse,
    updateCosurse,
    getCourseReview,
    getBestCourse
}