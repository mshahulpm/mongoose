const { default: mongoose } = require("mongoose");
const { mongo_client, connect } = require("./connect")


const movies = mongo_client.db('sample_mflix').collection('movies');


(async function () {

    await mongo_client.connect()

    console.log(
        await movies.aggregate([
            {
                $match: {
                    'imdb.rating': { $gt: 0 },
                    year: { $gte: 2010, $lte: 2015 },
                    runtime: { $gte: 90 }
                }
            },
            {
                $unwind: '$genres'
            },
            { $limit: 3 },
            { $project: { title: 1, genres: 1 } }
        ]).toArray()
    )

})()