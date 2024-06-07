const jws = require('jsonwebtoken');

const secret = 'secretoken';

function createToken(user) {

    const payload = {
        _id: user._id,
        email: user.email
    }

    const token = jws.sign(payload, secret, { expiresIn: '2d' });

    return token;
};

function verifyToken(token) {
    return jws.verify(token, secret);
};

module.exports = {
    createToken,
    verifyToken
}