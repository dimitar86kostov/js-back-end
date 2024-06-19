const Stones = require('../models/Stones');

exports.getAll = () => Stones.find();

exports.getLatest = () => Stones.find().sort({ createdAt: -1 }).limit(3);

exports.getOne = (stoneId) => Stones.findById(stoneId).populate('likedList').populate('owner');

exports.createStone = async (stoneData, userId) => {
    return await Stones.create({ ...stoneData, owner: userId });
};

exports.search = (query) => Stones.find(query);

exports.liked = async (stoneId, userId) => await Stones.findByIdAndUpdate(stoneId, { $push: { likedList: userId } });

exports.edit = (stoneId, stoneData) => Stones.findByIdAndUpdate(stoneId, stoneData, { runValidators: true });

exports.delete = async (stoneId) => {

    // await Stones.findByIdAndUpdate(stoneId, { $pull: { likedList: userId } });
    await Stones.findByIdAndDelete(stoneId);
};


