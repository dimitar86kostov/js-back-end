function dataController(req, res) {
    res.json({
        message: 'hello',
        value: 5,
        count: req.count,
    })
}

function jsonControler(req, res) {
    res.json({
        count: req.count
    })
}

module.exports = { dataController, jsonControler }