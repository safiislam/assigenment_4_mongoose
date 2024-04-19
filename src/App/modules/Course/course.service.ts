import mongoose from "mongoose";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { Review } from "../Review/review.model";


const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    // console.log(query);
    // {
    //     const removeArray = ['page', "limit", 'sortBy']
    // const courseFields = []
    // const courseSerachAbleFildels = Object.keys(query).filter(el => !removeArray.includes(el))
    // if (courseSerachAbleFildels.includes('tags')) {
    //     courseFields.push('tags.name')
    // }
    // else if (courseSerachAbleFildels.includes('details')) {
    //     courseFields.push('details.level')
    // }
    // else {
    //     courseFields.push(...courseSerachAbleFildels)
    // }

    // const queryArray = query[courseSerachAbleFildels[0]]
    // console.log(queryArray);
    // const searchField = Course.find({
    //     $or: [
    //         courseFields.map((field) => ({
    //             [field]: { $regex: queryArray, $options: 'i' }
    //         }))
    //     ]
    // })

    // const minPrice = query?.minPrice
    // const maxPrice = query?.maxPrice

    // const rangeField = await searchField.find({
    //     price: { $lte: maxPrice || 1000000, $gte: minPrice }
    // })
    // // const alldata = await rangeField.find()

    // // console.log(courseSerachAbleFildels);
    // return rangeField
    // }
    try {
        let result = Course.find()
        // Pagination
        const page: number = parseInt(query?.page as string) || 1
        const limit: number = parseInt(query?.limit as string) || 10
        const skip: number = (page - 1) * limit
        result = result.skip(skip).limit(limit)


        // Sorting
        const sortBy: string | undefined = query?.sortBy as string || undefined
        const sortOrder: string = query?.sortOrder as string || 'asc'

        if (sortBy) {
            const sortParams: { [key: string]: 'asc' | 'desc' } = { [sortBy]: sortOrder as 'asc' | 'desc' }
            result = result.sort(sortParams)
        }


        // Price range
        const minPrice: number = Number(query?.minPrice)
        const maxPrice: number = Number(query?.maxPrice)
        if (minPrice && maxPrice) {
            result = result.where('price').gte(minPrice).lte(maxPrice)
        }
        else if (minPrice) {
            result = result.where('price').gte(minPrice)
        }
        else if (maxPrice) {
            result = result.where('price').lte(maxPrice)
        }

        const tags: string = query?.tags as string
        if (tags) {
            result = result.where("tags.name").equals(tags)
        }

        // Date range
        const startDate: number = Number(query?.startDate)
        const endDate: number = Number(query?.endDate)
        if (startDate && endDate) {
            result = result.where("startDate").gte(startDate).lte(endDate)
        }

        // language
        const language: string = query?.language as string
        if (language) {
            result = result.where("language").equals(language)
        }

        // provider
        const provider: string = query?.provider as string
        if (provider) {
            result = result.where('provider').equals(provider)
        }


        // durationInWeeks
        const durationInWeeks: number = Number(query?.durationInWeeks)
        if (durationInWeeks) {
            result = result.where('durationInWeeks').equals(durationInWeeks)
        }
        const level: string = query?.level as string
        if (level) {
            result = result.where('details.level').equals(level)
        }

        const courses: TCourse[] = await result.exec();
        return courses
    } catch (error) {
        throw new Error('Error fetching courses')
    }
}
const updateCosurseFromBD = async (id: string, payload: Partial<TCourse>) => {
    const { details, tags, ...remainingData } = payload
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const modifiedUpdateData: Record<string, unknown> = {
            ...remainingData
        }
        if (details && Object.keys(details)) {
            for (const [key, value] of Object.entries(details)) {
                modifiedUpdateData[`details.${key}`] = value
            }
        }
        const updateCourseInfo = await Course.findByIdAndUpdate(id, modifiedUpdateData, {
            new: true,
            runValidators: true,
            session
        })
        if (tags && tags.length) {
            const deleteTags = tags.filter(el => el.name && el.isDeleted).map(el => el.name)
            const deletedCourseTags = await Course.findByIdAndUpdate(id, {
                $pull: { tags: { name: { $in: deleteTags } } }
            }, {
                new: true,
                runValidators: true,
                session
            })
            if (!deletedCourseTags) {
                throw new Error('Faild to update Course')
            }
        }
        const addTags = tags?.filter(el => el.name && !el.isDeleted)
        const addTagsInCourse = Course.findByIdAndUpdate(id, {
            $addToSet: { tags: { $each: addTags } }
        }, {
            new: true,
            upsert: true,
            session
        })
        if (!addTagsInCourse) {
            throw new Error('Faild to update Course')
        }
    } catch (error: any) {
        throw new Error(error)
    }


}

const getCourseReviewFromDB = async (id: string) => {
    const courseData = await Course.findById(id)
    const reviewData = await Review.find({ courseId: id })
    const result = {
        course: courseData,
        reviews: reviewData
    }
    return result

}
const getBestCourseFromDB = async () => {
    const result = await Review.aggregate([
        {
            $group: {
                _id: "$courseId",
                averageRating: { $avg: "$rating" },
                reviewCount: { $sum: "$rating" }
            },

        },
        {
            $lookup: {
                from: 'courses',
                localField: '_id',
                foreignField: '_id',
                as: 'course'
            }
        },
        {
            $project: {
                _id: 0,
                course: 1,
                averageRating: 1,
                reviewCount: 1
            }
        },
        {
            $sort: { 'reviewCount': -1 }
        },
        {
            $limit: 1
        }
    ])
    return result

}
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id)
    // if (!result) {
    //     throw new Error('This user is not exist')
    // }
    return result
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    updateCosurseFromBD,
    getCourseReviewFromDB,
    getBestCourseFromDB,
    getSingleCourseFromDB
}