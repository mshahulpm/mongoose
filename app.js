require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
mongoose.connect(process.env.mongo_url, {}, (e) => {
    if (e) {
        console.log(e)
        process.exit(1)
    }
    console.log('db connected')
})

const app = express()


app.listen(3000, () => {
    console.log('server is running on port 3000')
})