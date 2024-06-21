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

exports.search = async (name, type) => {
    let result = await this.getAll().lean();

    if (name) {
        result = result.filter(v => v.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (type) {
        result = result.filter(v => v.typeVolcano.includes(type));
    }

    return result; 
};