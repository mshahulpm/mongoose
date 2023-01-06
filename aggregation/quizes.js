const { default: mongoose } = require("mongoose");
const { mongo_client, connect } = require("./connect")


const movies = mongo_client.db('sample_mflix').collection('movies');

const favoritesActors = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"];

(async function () {

    await mongo_client.connect()

    console.log(
        await movies.aggregate([
            {
                $match: {
                    'tomatoes.viewer.rating': { $gte: 3 },
                    countries: 'USA',
                    cast: {
                        $in: favoritesActors
                    }
                }
            },
            {
                $addFields: {
                    fav_cast: {
                        $filter: {
                            input: '$cast',
                            as: 'ct',
                            cond: { $in: ['$$ct', favoritesActors] }
                        }
                    }
                }
            },
            {
                $project: {
                    title: 1,
                    rating: '$tomatoes.viewer.rating',
                    hello: '$title',
                    fav_cast: 1,
                    num_favorite: {
                        $size: '$fav_cast'
                    }
                }
            },
            {
                $sort: {
                    num_favorite: -1,
                    rating: -1,
                    title: -1,
                }
            },
            { $skip: 24 },
            { $limit: 1 }
        ], { allowDiskUse: true }).toArray(),

        await movies.findOne({ title: 'The Heat' })
    )

})()