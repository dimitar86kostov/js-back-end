const cookieParser = require("cookie-parser");
const { manualParseCookie } = require("../../util");

module.exports = {

    homeController: (req, res) => {
        //reading cookie header from the client 
        const cookieData = req.headers['cookie'];

        //parse cookies
        const cookies = manualParseCookie(cookieData);
        // const cookies = cookieParser(cookieData); 

        //changing the theme of background in the main template
        const useDark = cookies.theme == 'dark';

        //set message with dep library
        req.session.message = 'hello';

        res.render('home', { useDark });
    },
    setController: (req, res) => {
        //sending cookie header to the client. HttpOnly and Secure is optional
        res.setHeader('Set-Cookie', 'my-cookie=hey; HttpOnly; Secure')
        res.redirect('/');
    },
    getController: (req, res) => {
        const cookieData = req.headers['cookie'];
        res.render('get');
    },
    useLight: (req, res) => {
        res.setHeader('Set-Cookie', 'theme=light')
        res.redirect('/');
    },
    useDark: (req, res) => {
        res.setHeader('Set-Cookie', 'theme=dark')
        res.redirect('/');
    },
}

