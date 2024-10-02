const { validationResult, body } = require('express-validator')
const Course = require('../models/courses.models');
const HttpStatusText = require('../utils/HttpStatusText');
const { status } = require('express/lib/response');



//getAllCourses
const getAllCourses = async (req, res) => {
    try {
        //pagination
        console.log(req.headers);
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;
        const Courses = await Course.find({}, { "__v": 0 }).limit(limit).skip(skip);
        res.json({ status: HttpStatusText.SUCCESS, data: { Courses } })
    } catch {
        res.status(400).json({ status: HttpStatusText.ERROR, message: "Invalid Object ID", code: 400 })
    }
}

//GetCourse
const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ status: HttpStatusText.fAIL, message: "Course not found", code: 404 })
        }
        res.json({ status: HttpStatusText.SUCCESS, data: { course } });
    } catch (err) {
        return res.status(400).json({ status: HttpStatusText.ERROR, message: "Invalid Object ID" })
    }

};

//CreateCourse
const addCourse = async (req, res) => {

    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    //ADD COURES
    const newCourse = new Course(req.body);
    await newCourse.save()
    res.status(201).json({ status: HttpStatusText.SUCCESS, newCourse })
};

//Update Course
const UpdateCourse = async (req, res) => {

    const courseId = req.params.courseId;
    try {
        const updateCoures = await Course.findByIdAndUpdate(courseId, { $set: { ...req.body } })
        return res.status(200).json({
            status: HttpStatusText.SUCCESS,
            updateCoures
        })
    } catch (err) {
        return res.status(400).json({ status: HttpStatusText.ERROR, error: err })
    }



};

//Delete Course
const deleteCourse = async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.params.courseId })
        res.status(200).json({ status: HttpStatusText.SUCCESS, data: null })
    } catch (err) {
        res.status(400).json({ status: HttpStatusText.ERROR, message: "Invalid Object ID" })
    }
};


module.exports = {
    getAllCourses, getCourse, UpdateCourse, deleteCourse, addCourse
};