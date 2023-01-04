const { connect, mongo_client } = require("./connect")
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

const customers = mongo_client.db('sample_analytics').collection('customers');
const companies = mongo_client.db('sample_training').collection('companies ');

// it is only available in mongodb atlas 

(async function () {

    await mongo_client.connect()

    console.log(

        await companies.find({ name: 'f' }).toArray()
    )

})()