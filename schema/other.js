const mongoose = require('mongoose')
const { Schema } = mongoose


const PersonSchema = new Schema({
    application_no: Number,
    name: String,
    age: Number,
    place: String,
    friends: [Number]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

PersonSchema.virtual('other_data', {
    ref: 'MetaData',
    localField: 'application_no',
    foreignField: 'application_no',
    justOne: true
})

PersonSchema.virtual('friends_data', {
    ref: 'Person',
    foreignField: 'application_no',
    localField: 'friends'
})

const Person = mongoose.model('Person', PersonSchema)

const MetaDataSchema = new Schema({
    application_no: Number,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

MetaDataSchema.virtual('person', {
    ref: 'Person',
    localField: 'application_no',
    foreignField: 'application_no',
    justOne: true
})

const MetaData = mongoose.model('MetaData', MetaDataSchema)

module.exports = {
    Person,
    MetaData
}