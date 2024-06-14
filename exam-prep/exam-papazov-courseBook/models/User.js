const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: 2
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: 10
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 4
    },
    createdCourses: [{
        type: [mongoose.Types.ObjectId],
        ref: 'User'
    }],
    signedUpCourses: {
        type: [mongoose.Types.ObjectId],
        ref: 'User'
    },
});


userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});


// Setter for validation repass, instead of doing (password != repass) in authService:
// userSchema.virtual('repass')
//     .set(function (value) {
//         if (value != this.password) {
//             throw new Error('Password missmatch');
//         }
//     });


const User = mongoose.model('User', userSchema);


module.exports = User;