const data = require('../../data/catalog.json');

let nextId = 6

function getParts() {
    return data;
}
function getPartsById(id) {
    return data.find(p => p.id == id);
}
function createPart(partData) {
    let part = {
        id: nextId++,
        name: partData.name,
        price: partData.price,
        stock: partData.stock,
        description: partData.description
    }
    data.push(part)

    return part;
}

function updatePart(id, partData) {
    const part = getPartsById(id);

    part.name = partData.name;
    part.price = Number(partData.price);
    part.stock = Number(partData.stock);
    part.description = partData.description;

}

module.exports = {
    getParts,
    getPartsById,
    createPart,
    updatePart
}
