import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import validationRequest from "../../middleware/validationRequest";
import { CategoryValidations } from "./category.validation";


const router = Router()
router.post('/', validationRequest(CategoryValidations.categoryValidationSchema), CategoryControllers.createCategory)
router.get('/', CategoryControllers.getAllCategories)


export const CategoryRoutes = router