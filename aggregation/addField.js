// addField is a better way to add extra fields without mentioning about other  

const { default: mongoose } = require("mongoose");
const { mongo_client, connect } = require("./connect")


const grades = mongo_client.db().collection('grades');


(async function () {

    await mongo_client.connect()

    console.log(
        await grades.aggregate([
            {
                $project: {
                    _id: 1,
                    student_id: 1,
                    class_id: 1,
                    scores: 1,
                    total_score: { $sum: '$scores.score' },
                    average: { $divide: [{ $sum: '$scores.score' }, 4] },
                }
            }, {
                $limit: 1
            }
        ]).toArray(),

        //  above one equivalent to the below one 

        await grades.aggregate([
            {
                $addFields: {
                    total_score: { $sum: '$scores.score' },
                    average: { $divide: [{ $sum: '$scores.score' }, 4] },
                }
            },
            { $sort: { total_score: 1 } },
            {
                $limit: 1
            }
        ]).toArray()
    )

})()