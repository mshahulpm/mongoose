const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: {
        type: Boolean, default: false
    },
    meta: {
        votes: Number,
        favs: Number
    }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book