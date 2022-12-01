const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: {
        type: Boolean, default: false
    },
    meta: {
        votes: Number,
        favs: Number
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Book = mongoose.model('Book', bookSchema)

const UserSchema = new Schema({
    name: String,
    age: Number
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

UserSchema.virtual('post', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author',
    justOne: true
})

const User = mongoose.model('User', UserSchema)

module.exports = {
    Book,
    User
}