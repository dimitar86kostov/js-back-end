const Stones = require('../models/Stones');

exports.getAll = () => Stones.find();

exports.getLatest = () => Stones.find().sort({ createdAt: -1 }).limit(3);

exports.getOne = (stoneId) => Stones.findById(stoneId).populate('likedList').populate('owner');

exports.createStone = async (stoneData, userId) => {
    return await Stones.create({ ...stoneData, owner: userId });

};

