const { default: mongoose } = require("mongoose");
const { mongo_client, connect } = require("./connect")


const grades = mongo_client.db().collection('grades');
const Grade = mongoose.model('Grade', new mongoose.Schema({}, { strict: false }));

(async function () {
    await mongo_client.connect()
    await connect()

    console.log(
        (await Grade.aggregate([
            // find all grad doc for a specific class 
            {
                $match: { class_id: 265 }
            },
            // project the returned doc to the required fields (can also generate custom fields)
            // { $count: '_id' }
            {
                $project: {
                    _id: 0,
                    total_score: { $sum: '$scores.score' },
                    average: { $divide: [{ $sum: '$scores.score' }, 4] },
                    scores: {
                        $filter: {
                            input: '$scores',
                            as: 'score',
                            cond: { $eq: ['$$score.type', 'exam'] }
                        }
                    }
                }
            },
            {
                $project: {
                    exam_score: '$scores.score',
                    total_score: 1,
                    average: 1
                }
            },
        ])))

})()