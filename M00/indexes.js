const { connect, mongo_client } = require("./connect")
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

const customers = mongo_client.db('sample_analytics').collection('customers');
const zips = mongo_client.db('sample_training').collection('zips');

(async function () {

    await mongo_client.connect()

    console.log(
        // await customers.deleteMany({ email: 'jennifer49@gmail.com' }),
        // await customers.createIndex({ email: 1 }, { unique: true, }),

        // if a record with same email exist then it will throw error 
        // await customers.deleteOne({ email: 'jennifer49@gmail.com' }),

        // get all indexes 
        // await customers.indexes(),

        // drop index 
        // await customers.dropIndex('email_1'),

        await customers.findOne()

    )

})()
