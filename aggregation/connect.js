require('dotenv').config()
const { default: mongoose } = require("mongoose")
const mongodb = require('mongodb')

const mongo_client = new mongodb.MongoClient(process.env.mongo_url)

module.exports = {
    async connect() {
        await mongoose.connect(process.env.mongo_url)
    },
    mongo_client
}