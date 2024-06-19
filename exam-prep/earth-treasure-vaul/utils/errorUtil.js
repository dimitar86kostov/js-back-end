const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    let message = '';

    if (err instanceof mongoose.MongooseError) {
        return Object.values(err.errors).at(0).message;
    } else if (err instanceof Error) {
        return err.message;
    }

    // return message;
}



// if (err instanceof Error) {
//     if (!err.errors) {
//         // Generic error
//         err.errors = [err.message];
//     } else {
//         // Mongoose validation error
//         const error = new Error('Input validation error');
//         error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));
//         console.log(error.errors);
//         return error;
//     }
// } else if (Array.isArray(err)) {
//     // Express-validator error array
//     const error = new Error('Input validation error');
//     error.errors = Object.fromEntries(err.map(e => [e.path, e.msg]));

//     return error;
// }

// return err;
