const Volcano = require('../models/Volcano');

exports.getAll = () => Volcano.find();

exports.getOne = (volcanoId) => Volcano.findById(volcanoId).populate(['owner', 'voteList']);

exports.create = async (volcanoData, userId) => {
    return await Volcano.create(
        {
            ...volcanoData,
            owner: userId
        });
};

exports.edit = async (volcanoId, editedVolcano) => await Volcano.findByIdAndUpdate(volcanoId, editedVolcano, { runValidators: true });

exports.delete = async (volcanoId) => await Volcano.findByIdAndDelete(volcanoId);

exports.voted = async (volcanoId, userId) => await Volcano.findByIdAndUpdate(volcanoId, { $push: { voteList: userId } });

exports.search = (name, type) => {

    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    }
    if (type && type != '---') {
        query.type = type;
    }

    return Volcano.find(query);
};