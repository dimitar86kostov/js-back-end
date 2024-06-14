const Course = require("../models/Course");
const User = require("../models/User");

exports.getAll = () => Course.find();


exports.getOne = (courseId) => Course.findById(courseId);


exports.createCourse = async (courseData, userId) => {
    const newCourse = await Course.create({ ...courseData, owner: userId })
    
    await User.findByIdAndUpdate(userId, { $push: { createdCourses: newCourse._id } });

    return newCourse;
};


