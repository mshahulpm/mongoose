require('dotenv').config()
const { default: mongoose } = require("mongoose")

module.exports = {
    async connect() {
        await mongoose.connect(process.env.mongo_url)
    }
}