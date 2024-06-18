const Course = require("../models/Course");
const User = require("../models/User");

exports.getAll = () => Course.find();

// For the exam we dont need 2 getOne functions, but it's good pattern to have one populated and one not populated getters
exports.getOne = (courseId) => Course.findById(courseId);

exports.getLatest = () => Course.find().sort({ createdAt: -1 }).limit(3);

exports.getOneDetailed = (courseId) => this.getOne(courseId).populate('owner').populate('signUpList');

exports.signUp = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, { $push: { signUpList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { signedUpCourses: courseId } });
};

exports.createCourse = async (courseData, userId) => {
    const newCourse = await Course.create({ ...courseData, owner: userId })

    await User.findByIdAndUpdate(userId, { $push: { createdCourses: newCourse._id } });

    return newCourse;
};

exports.edit = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData, { runValidators: true });

exports.delete = async (courseId, owner) => {

    await User.findByIdAndUpdate(owner, { $pull: { createdCourses: courseId } });

    await Course.findByIdAndDelete(courseId);
};





