import 'dotenv/config'
import mongoose from 'mongoose'
import { fieldEncryption } from 'mongoose-field-encryption'

const PostSchema = new mongoose.Schema({
    title: {

    },
    message: String,
    references: {
        author: String,
        date: Date,
    },
})
