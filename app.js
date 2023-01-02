require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
mongoose.connect(process.env.mong_ssl, {
    ssl: true,
    tlsAllowInvalidCertificates: true
}, (e) => {
    if (e) {
        console.log(e)
        process.exit(1)
    }
    console.log('db connected')
})

// routes 
const booksRoute = require('./routes/books')
const userRoute = require('./routes/user')
const personRoute = require('./routes/person')
const nestedRoute = require('./routes/nested')
const familyRoute = require('./routes/family')

const app = express()
app.use(express.json())

app.use('/books', booksRoute)
app.use('/user', userRoute)
app.use('/person', personRoute)
app.use('/nested', nestedRoute)
app.use('/family', familyRoute)



app.listen(3000, () => {
    console.log('server is running on port 3000')
})