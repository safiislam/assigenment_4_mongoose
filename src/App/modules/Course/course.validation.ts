import { z } from "zod";


const createTagValidationSchema = z.object({
    name: z.string(),
    isDeleted: z.boolean().optional()
})
// const detailsValidationScheam = z.object({
//     level: z.string(),
//     discription: z.string()
// })
const updateTagValidationSchema = z.object({
    name: z.string().optional(),
    isDeleted: z.boolean().optional()
})

const createCourseValidationSchema = z.object({
    body: z.object({
        course: z.object({
            title: z.string(),
            instructor: z.string(),
            categoryId: z.string(),
            price: z.number(),
            tags: z.array(createTagValidationSchema),
            startDate: z.string(),
            endDate: z.string(),
            language: z.string(),
            provider: z.string(),
            durationInWeeks: z.number().optional(),
            details: z.object({
                level: z.string(),
                discription: z.string()
            })
        })
    })
})
const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        instructor: z.string().optional(),
        categoryId: z.string().optional(),
        price: z.number().optional(),
        tags: z.array(updateTagValidationSchema),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        language: z.string().optional(),
        provider: z.string().optional(),
        durationInWeeks: z.number().optional(),
        details: z.object({
            level: z.string().optional(),
            discription: z.string().optional()
        })

    })
})



export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema
} 