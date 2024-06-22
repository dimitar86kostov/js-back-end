const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The username should be at least 4 characters long'],
        minLength: 4
    },
    email: {
        type: String,
        required: [true, 'The email should be at least 10 characters long'],
        minLength: 10
    },
    password: {
        type: String,
        required: [true, 'The password should be at least 3 characters long'],
        minLength: 3
    },
    wishingBooks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book',
    }],
}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

// Setter for validation repass, instead of doing it in authService:
// userSchema.virtual('repass')
//     .set(function (value) {
//         if (value != this.password) {
//             throw new Error('Password missmatch');
//         }
//     });

const User = mongoose.model('User', userSchema);

module.exports = User;