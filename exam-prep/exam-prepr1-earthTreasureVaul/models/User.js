const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
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