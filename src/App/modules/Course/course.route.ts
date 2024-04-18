import { Router } from "express";
import { CourseControllers } from "./course.controller";
import validationRequest from "../../middleware/validationRequest";
import { CourseValidations } from "./course.validation";





const router = Router()

router.post('/create-course',
    validationRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse)
router.get('/', CourseControllers.getAllCourse)
router.get('/:courseId/reviews', CourseControllers.getCourseReview)
router.get('/best', CourseControllers.getBestCourse)
router.patch('/courseId', validationRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCosurse)

export const CourseRoutes = router