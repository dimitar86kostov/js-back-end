const User = require("../models/User");

exports.getUserInfo = (userId) => User.findById(userId);