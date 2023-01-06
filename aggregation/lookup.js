const { default: mongoose } = require("mongoose");
const { mongo_client, connect } = require("./connect")


const customers = mongo_client.db('sample_analytics').collection('customers');



(async function () {

    await mongo_client.connect()

    console.log(

        await customers.aggregate([
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'accounts',
                    foreignField: 'account_id',
                    as: 'account_coll'
                }
            }, {
                $limit: 1
            }
        ]).toArray()

    )

})()