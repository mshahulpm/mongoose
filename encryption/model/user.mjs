import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import * as encryptionUtils from '../encryption.mjs'


const EducationSchema = new mongoose.Schema({
    is_educated: Boolean,
    qualification: String
})

EducationSchema.plugin(fieldEncryption, {
    fields: ["qualification"],
    secret: encryptionUtils.SECRET,
    saltGenerator: encryptionUtils.defaultSaltGenerator
})

const FingerprintSchema = new mongoose.Schema({
    left: String,
    right: String,
    thumbs: String
})

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    city: String,
    dob: Date,
    education: EducationSchema,
})


UserSchema.plugin(fieldEncryption, {
    fields: ["email", "address", "phone", "dob"],
    secret: encryptionUtils.SECRET,
    saltGenerator: encryptionUtils.defaultSaltGenerator,
});


export const User = mongoose.model("User", UserSchema);
