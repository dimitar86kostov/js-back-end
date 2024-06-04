module.exports = {

    homeController: (req, res) => {
        res.render('home');
    },
    details: (req, res) => {
        const { id } = req.params;
        
    }
}