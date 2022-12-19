const { Schema, default: mongoose, } = require("mongoose");
const mongooseOption = {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

const PeopleSchema = new Schema({
    name: String,
    dob: Date,
    place: String,
    gender: String,
    app_no: String,
}, mongooseOption)

const People = mongoose.model('People', PeopleSchema)

const ChildrenSchema = new Schema({
    app_no: String,
    name: String
}, mongooseOption)

ChildrenSchema.virtual('details', {
    ref: 'People',
    localField: 'app_no',
    foreignField: 'app_no',
    justOne: true
})

ChildrenSchema.virtual('mother_relation', {
    ref: 'Family',
    localField: 'app_no',
    foreignField: 'mother',
    match: {
        $or: [
            { mother: this.app_no },
            { father: this.app_no },
        ]
    }
})

ChildrenSchema.virtual('father_relation', {
    ref: 'Family',
    localField: 'app_no',
    foreignField: 'father',
})


const FamilySchema = new Schema({
    father: String,
    father_name: String,
    mother: String,
    mother_name: String,
    status: String,
    children: [ChildrenSchema],
},)

const Family = mongoose.model('Family', FamilySchema)

module.exports = {
    Family,
    People
}