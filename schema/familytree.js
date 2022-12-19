const { Schema, default: mongoose, } = require("mongoose");


const PeopleSchema = new Schema({
    name: String,
    dob: Date,
    place: String,
    gender: String,
    app_no: String,
})

const People = mongoose.model('People', PeopleSchema)

const ChildrenSchema = new Schema({
    app_no: String,
    name: String
})

const FamilySchema = new Schema({
    father: String,
    father_name: String,
    mother: String,
    mother_name: String,
    status: String,
    children: [ChildrenSchema],
})

const Family = mongoose.model('Family', FamilySchema)

module.exports = {
    Family,
    People
}