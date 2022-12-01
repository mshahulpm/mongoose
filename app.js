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

// routes 
const booksRoute = require('./routes/books')
const userRoute = require('./routes/user')

const app = express()
app.use(express.json())

app.use('/books', booksRoute)
app.use('/user', userRoute)

app.listen(3000, () => {
    console.log('server is running on port 3000')
})