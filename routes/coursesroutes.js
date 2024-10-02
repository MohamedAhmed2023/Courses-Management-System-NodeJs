const express = require('express')
let { getAllCourses, getCourse, UpdateCourse, deleteCourse, addCourse } = require('../controllers/courses.controller')
const validationSchema = require('../middleware/validationSchema')
const Auth = require('../middleware/Auth')
const userRoles = require('../utils/userRoles')
const allowedTo = require('../middleware/allowedTo')
const router = express.Router()
router.route('/')
    .get(getAllCourses)
    .post(Auth, validationSchema(), addCourse)


router.route('/:courseId')
    .get(getCourse)
    .patch(Auth, allowedTo(userRoles.admin, userRoles.manger), UpdateCourse)
    .delete(Auth, deleteCourse)


module.exports = router;