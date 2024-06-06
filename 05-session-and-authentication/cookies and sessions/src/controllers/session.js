const cookieParser = require("cookie-parser");
const { manualParseCookie } = require("../../util");
const { getId } = require("../services/idGenerator")
const sessions = {};

module.exports = {

    setSession: (req, res) => {
        const id = getId();

        sessions[id] = { visits: 0 };
        res.setHeader('Set-Cookie', `sessionId=${id}; HttpOnly; Secure`)
        res.redirect('/get-session')

        //with session dep library
        // res.cookie('message', 'Hey there');
        // res.end('Cookie set')
    },
    getSession: (req, res) => {
        const cookieData = req.headers['cookie'];
        const cookies = manualParseCookie(cookieData);

        const sessionId = cookies.sessionId;
        const session = sessions[sessionId];

        if (session) {
            console.log(session);
            session.visits++;
        } else {
            console.log('Anonymouse user');
        }        

        res.render('session', { visits: session?.visits || 0})
    }
}