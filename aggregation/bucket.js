const { default: mongoose } = require("mongoose");
const { mongo_client, connect } = require("./connect")


const companies = mongo_client.db('sample_training').collection('companies');

(async function () {

    await mongo_client.connect()

    console.log(

        await companies.aggregate([
            {
                $match: {
                    founded_year: { $gt: 1980 },
                    number_of_employees: { $ne: null }
                }
            }, {
                $bucket: {
                    groupBy: '$number_of_employees',
                    'boundaries': [0, 20, 50, 100, 500, 1000, Infinity]
                }
            }
        ]).toArray()

    )

})()