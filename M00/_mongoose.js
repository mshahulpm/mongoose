require('dotenv').config()
const mongoose = require('mongoose');

(async function () {

    const Sale = mongoose.model('Sale', new mongoose.Schema({}, { strict: false }))

    console.log(await Sale.find({
        'customer.age': { $lte: 36 }
    }).count())
})()


/**
   get count of all sales which have any one item which is grater than 50

   Sale.find({
        'items.price': { $gt: 50 }
    }).count()

    get list of sales where customer is younger or equal to 36 years

     Sale.find({
        'customer.age': { $lte: 36 }
    })

 */

// get count of docs

// const Zip = mongoose.model('Zip', new mongoose.Schema({}, { strict: false }))
// Zip.find({
//     city: {
//         $in: ['CHICAGO', 'PHOENIX']
//     }
// }).count()