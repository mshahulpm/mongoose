const { connect } = require("./connect")
const { default: mongoose } = require("mongoose");

// match a doc when a sub field include in sub array 

// (async function () {
//     await connect()

//     const Account = mongoose.model('Account', new mongoose.Schema({}, { strict: false }))

//     console.log(
//         await Account.find({ products: { $elemMatch: { $eq: 'InvestmentStock' } } }, 'products')
//             .count(),
//         await Account.find({ products: { $elemMatch: { $eq: ['InvestmentStock', 'InvestmentFund'] } } }, 'products')
//             .count(),

//         await Account.count()
//     )
// })()



(async function () {
    await connect()

    const Sale = mongoose.model('Sale', new mongoose.Schema({}, { strict: false }))

    console.log(
        await Sale.find({
            items: {
                $elemMatch: {
                    name: 'laptop',
                    // price: { $gt: 2000 },
                    price: { $gt: 1550 },
                    // quantity: { $gte: 1 },
                    quantity: 1
                }
            }
        })
            .count()
    )
})()