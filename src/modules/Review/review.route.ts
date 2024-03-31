import { Router } from "express";
import validationRequest from "../../middleware/validationRequest";
import { ReviewValidations } from "./review.validation";
import { ReviewControllers } from "./review.controller";


const router = Router()


router.post('/', validationRequest(ReviewValidations.createReviewValidationScheam), ReviewControllers.createReview)



export const ReviewRoutes = router