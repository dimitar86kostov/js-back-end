const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name should be between 2 and 20 characters long'],
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        required: [true, 'The email should be at least 10 characters long'],
        minLength: 10
    },
    password: {
        type: String,
        required: [true, 'The password should be at least 4 characters long'],
        minLength: 4
    },
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;