const { connect, mongo_client } = require("./connect")
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

const zips = mongo_client.db().collection('zips')
const small_state = mongo_client.db().collection('small_state')
const Company = mongoose.model('Company', new mongoose.Schema({}, { strict: false }));
const Zip = mongoose.model('Zip', new mongoose.Schema({}, { strict: false }));


(async function () {

    await connect()
    await mongo_client.connect()

    console.log(
        // match  === find query 
        await zips.aggregate([
            {
                $match: { state: 'CA' }
            },
            // group to find total zips in an city 
            {
                $group: {
                    _id: '$city',
                    totalZips: { '$count': {} }
                }
            }
        ]).toArray(),

        // mongoose 
        await Zip.aggregate([
            {
                $match: { state: 'CA' }
            },
            {
                $group: {
                    _id: '$city',
                    totalZips: { '$count': {} }
                }
            }
        ])
    )
});


(async function () {

    await connect()
    await mongo_client.connect()

    console.log(
        // sort 
        await zips.aggregate([
            {
                $sort: { pop: -1 }
            }, {
                $limit: 3
            }
        ]).toArray()

    )

});


(async function () {

    // await connect()
    await mongo_client.connect()

    console.log(
        await zips.findOne(),
        // project required fields and rename existing field
        await zips.aggregate([
            {
                $project: {
                    state: 1,
                    zip: 1,
                    population: '$pop',
                    loc: 1,
                    _id: 0
                }
            },
            {
                // set new field or modify existing 
                $set: {
                    'pop/10': { $round: { $divide: ['$population', 10] } },
                    'x+y': { $round: { $add: ['$loc.x', '$loc.y'] } }
                }
            },
            {
                $count: 'x+y'
            }
        ]).toArray()
    )

});

(async function () {

    await mongo_client.connect()

    console.log(

        await zips.aggregate([
            {
                // group all docs in the same state and sum population of the state
                $group: {
                    _id: "$state",
                    total_population: { $sum: '$pop' }
                }
            }, {
                // match all state where population less than 1000000
                $match: {
                    total_population: { $lt: 1000000 }
                },
            },
            // {
            // create new record with additional fields by custom function 
            // $project: {
            //     total_population: 1,
            //     date: new Date(),
            //     _id: ObjectId(),
            //     state: '$_id'
            // }
            // },
            {
                // save the result into new collection 
                $out: 'small_state'
            }
        ]).toArray(),

        // find small state docs 

        await small_state.find().toArray()
    )

})()

