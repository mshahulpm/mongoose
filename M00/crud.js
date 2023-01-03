const { connect, mongo_client } = require("./connect")
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");



(async function () {

    await connect()
    await mongo_client.connect()

    const Route = mongoose.model('Route', new mongoose.Schema({}, { strict: false }))

    console.log(
        // Replace
        await Route.findOneAndReplace(
            { _id: '56e9b39b732b6122f877fa3a' },
            { name: 'Corrupted data' },
            { new: true }
        ),
        await Route.findOne({ _id: '56e9b39b732b6122f877fa3a' }),

        // Update 
        await Route.findOneAndUpdate(
            { _id: '56e9b39b732b6122f877fa3a' },
            {
                airline: { id: 410, name: 'Aerocondor', alias: '2B', iata: 'ARD' },
                src_airport: 'EGO',
                dst_airport: 'KGD',
                codeshare: '',
                stops: 0,
                airplane: 'CR2',
                array: []
            },
            { new: true }
        ),

        // Upsert 
        await Route.findOneAndUpdate(
            { name: "Shahul" },
            {
                airline: { id: 410, name: 'Aerocondor', alias: '2B', iata: 'ARD' },
                src_airport: 'EGO',
                dst_airport: 'KGD',
                codeshare: '',
                stops: 0,
                airplane: 'CR2',
                array: []
            },
            { new: true, upsert: true }
        ),

        // Push an item
        await Route.updateOne(
            { _id: '56e9b39b732b6122f877fa35' },
            { $push: { array: 5 } },
            { new: true }
        ),

        // Push multiple items
        await Route.updateOne(
            { _id: '56e9b39b732b6122f877fa35' },
            { $push: { array: { $each: [7, 8, 9] } } },
            { new: true }
        ),

        await Route.findById('56e9b39b732b6122f877fa35')
    )

});

(async function () {
    await connect()
    await mongo_client.connect()

    const Route = mongoose.model('Route', new mongoose.Schema({}, { strict: false }))

    console.log(
        // update a document and return it 
        // mongoose does not support this but it already used in findOneAndUpdate 
        // check mongodb native code 

        // await Route.findAndModify(
        //     { _id: '56e9b39b732b6122f877fa35' },
        //     { $inc: { stops: 1 } },
        //     { new: true }
        // )

        await mongo_client.db().collection('routes').findOneAndUpdate(
            { _id: ObjectId('56e9b39b732b6122f877fa35') },
            { $inc: { stops: 1 } },
            { new: true }
        )
    )
});

(async function () {

    // await connect()
    await mongo_client.connect();

    console.log(

        (await mongo_client.db().collection('routes').updateMany(
            { 'airline.id': 410 },
            { $inc: { stops: 1 } },
        ))

    )
});


(async function () {

    await mongo_client.connect();

    console.log(
        //    Delete one document 
        await mongo_client.db().collection('routes').deleteOne({ _id: ObjectId('63b31c141abd38809b2dc9ed') }),

        // delete many 
        await mongo_client.db().collection('routes').insertMany([
            { name: "None" },
            { name: "None" },
            { name: "None" },
            { name: "None" },
        ]),

        await mongo_client.db().collection('routes').deleteMany({
            name: 'None'
        })

    )

})()