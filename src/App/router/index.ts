import { Router } from "express";
import { CourseRoutes } from "../modules/Course/course.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { ReviewRoutes } from "../modules/Review/review.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/categories',
        route: CategoryRoutes
    },
    {
        path: '/reviews',
        route: ReviewRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router