const { Stone } = require('../models/Stone');

async function getAllStones() {
    return await Stone.find().lean();
}

async function getStoneById(id) {
    return await Stone.findById(id).lean().populate('likedList');
}

async function addStones(stoneData, owner) {

    const stone = new Stone({
        name: stoneData.name.trim(),
        category: stoneData.category.trim(),
        color: stoneData.color.trim(),
        image: stoneData.image.trim(),
        location: stoneData.location.trim(),
        formula: stoneData.formula.trim(),
        description: stoneData.description.trim(),
        likedList: stoneData.likedList,
        owner: stoneData.owner,
    });

    await stone.save();

    return stone;
}

module.exports = {
    getAllStones,
    getStoneById,
    addStones
}

