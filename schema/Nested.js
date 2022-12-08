const mongoose = require('mongoose')
const { Schema } = mongoose


const nestedSchema = new Schema({
    title: String,
    body: String,
    user: {
        name: String,
        age: String,
    },
    meta: {
        isVerified: Boolean,
        popularity: Number,
    },
    comment: {
        title: String,
        body: String
    }
})

const Nested = mongoose.model('Nested', nestedSchema)

module.exports = {
    Nested
}