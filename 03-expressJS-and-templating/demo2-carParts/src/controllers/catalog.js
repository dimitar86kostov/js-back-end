const data = require('../../data/catalog.json');
const { getParts, getPartsById } = require('../services/parts');

module.exports = {
    catalogControler: (req, res) => {
        const parts = getParts();
        res.render('catalog', { parts })
    },

    detailsControler: (req, res) => {
        const { id } = req.params;
        const part = getPartsById(id);

        if (!part) {
            res.redirect('/404')
        }
        res.render('details', part)
    }
}