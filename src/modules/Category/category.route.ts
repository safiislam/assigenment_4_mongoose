import { Router } from "express";
import { CategoryControllers } from "./category.controller";


const router = Router()
router.post('/', CategoryControllers.createCategory)
router.get('/', CategoryControllers.getAllCategories)


export const CategoryRoutes = router