const mongoose = require('mongoose');

exports.getErrorMessage = (err) => {
    //     if (err instanceof Error) {
    //         if (!err.errors) {
    //             // Generic error
    //             err.errors = [err.message];
    //         } else {
    //             // Mongoose validation error
    //             const error = new Error('Input validation error');
    //             error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));
    // console.log(error.errors);
    //             return error;
    //         }
    //     } else if (Array.isArray(err)) {
    //         // Express-validator error array
    //         const error = new Error('Input validation error');
    //         error.errors = Object.fromEntries(err.map(e => [e.path, e.msg]));

    //         return error;
    //     }

    //     return err;

    // Papazov
    if (err instanceof mongoose.MongooseError) {
        console.log(err.message);
        // return Object.values(err.errors)._message;
        return err.message;
    } else if (err instanceof Error) {
        return err.message;
    }
}