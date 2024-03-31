import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";


const reviewSchema = new Schema<TReview>({
    courseId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    }
})

// reviewSchema.pre('save', async function (next) {
//     const rating = this.rating
//     if (rating < 0 || rating > 5) {
//         throw new Error('Rating must be range 1 to 5')
//     }
//     next()
// })


export const Review = model<TReview>("Review", reviewSchema)

