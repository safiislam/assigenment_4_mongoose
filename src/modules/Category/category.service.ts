import { TCategory } from "./category.interface";
import { Category } from "./category.model";



const createCategoryIntoDB = async (payload: TCategory) => {
    if (await Category?.isCategoryExists(payload.name)) {
        throw new Error(`${payload.name} is Already Exists`)
    }
    const result = await Category.create(payload)
    return result
}

const getAllCategoriesFromBD = async () => {
    const result = await Category.find()
    return result
}

export const CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromBD
} 