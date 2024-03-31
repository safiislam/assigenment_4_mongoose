
import { Schema, model } from "mongoose";
import { CategoryModel, TCategory } from "./category.interface";


const categoryScheam = new Schema<TCategory, CategoryModel>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

categoryScheam.statics.isCategoryExists = async function (name: string) {
    const isExist = await Category.findOne({
        name: name
    })
    return isExist
}


export const Category = model<TCategory>('Category', categoryScheam)