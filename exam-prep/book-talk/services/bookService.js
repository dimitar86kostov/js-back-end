const Book = require('../models/Book');
const User = require('../models/User');

exports.getAll = () => Book.find();

exports.getOne = (bookId) => Book.findById(bookId).populate(['owner', 'wishingList']);

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData, { runValidators: true });

exports.create = async (bookData, userId) => {
    return await Book.create({
        ...bookData,
        owner: userId
    });
};

exports.wish = async (bookId, userId) => {
    await Book.findByIdAndUpdate(bookId, { $push: { wishingList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { wishingBooks: bookId } })

    return;
};

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);
