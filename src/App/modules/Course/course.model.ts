import { Schema, model } from "mongoose";
import { TCourse, TCourseDetails, Ttags } from "./course.interface";


const tagsSchema = new Schema<Ttags>({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

})
const courseDetailsSchema = new Schema<TCourseDetails>({
    level: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    instructor: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Categories"
    },
    price: {
        type: Number,
        required: true
    },
    tags: [tagsSchema],
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    durationInWeeks: {
        type: Number,
        // required: true
    },
    details: {
        type: courseDetailsSchema,
        required: true
    }
}, {
    timestamps: true
})

courseSchema.pre('save', async function (next) {
    const startDate = new Date(this.startDate)
    const endDate = new Date(this.endDate)
    const differentTime = endDate.getTime() - startDate.getTime()
    const differenceInDays = Math.round(differentTime / (1000 * 3600 * 24))
    const differentInWeeks = Math.ceil(differenceInDays / 7)
    this.durationInWeeks = differentInWeeks
    next()
})


export const Course = model<TCourse>("Course", courseSchema)