import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import * as encryptionUtils from '../encryption.mjs'


const PostSchema = new mongoose.Schema({
    title: String,
    message: String,
    references: {
        author: String,
        date: Date,
    },
})


PostSchema.plugin(fieldEncryption, {
    fields: ["message", "references"],
    secret: encryptionUtils.SECRET,
    saltGenerator: encryptionUtils.defaultSaltGenerator,
});


export const Post = mongoose.model("Post", PostSchema);
