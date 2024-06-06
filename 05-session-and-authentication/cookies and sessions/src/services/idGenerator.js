function getId() {
    // manual id generator
    return 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}
module.exports = {
    getId
}