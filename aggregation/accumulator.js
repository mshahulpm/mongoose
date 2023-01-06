const { default: mongoose } = require("mongoose");
const { mongo_client, connect } = require("./connect")


const movies = mongo_client.db('sample_mflix').collection('movies');


(async function () {

    await mongo_client.connect()

    console.log(
        await movies.aggregate([
            {
                $project: {
                    max_array: { $max: '$array' },
                    min_array: { $min: '$array' },
                    avg_array: { $avg: '$array' },
                    reduce_max: {
                        $reduce: {
                            input: '$array',
                            initialValue: -Infinity,
                            in: {
                                $cond: [
                                    { $gt: ['$$value', '$$this'] },
                                    '$$value',
                                    '$$this'
                                ]
                            }
                        }
                    }
                }
            },
            { $limit: 1 }
        ]).toArray()
    )
})()