const { connect } = require("./connect")
const { default: mongoose } = require("mongoose");


(async function () {

    await connect()

    const Route = mongoose.model('Route', new mongoose.Schema({}, { strict: false }))

    console.log(
        // AND
        await Route.find({
            'airline.name': 'Southwest Airlines',
            stops: { $gte: 1 }
        })
            .count(),
        // OR 
        await Route.find({
            $or: [
                { src_airport: 'SEA' },
                { dst_airport: 'SEA' },
            ]
        })
            .count(),

        // AND with OR 
        await Route.find({
            $and: [
                {
                    $or: [
                        { src_airport: 'SEA' },
                        { dst_airport: 'SEA' },
                    ]
                },
                {
                    $or: [
                        { 'airline.name': 'Southwest Airlines' },
                        { airplane: 320 }
                    ]
                }
            ]
        })//.count()
    )
})()