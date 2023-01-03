const { connect, mongo_client } = require("./connect")
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

const collection = mongo_client.db().collection('companies')
const Company = mongoose.model('Company', new mongoose.Schema({}, { strict: false }));


(async function () {

    await connect()
    await mongo_client.connect()

    console.log(
        (await collection.find({ category_code: "music" }, { projection: { name: 1, _id: 0, image: 1 } }).limit(1).sort({ name: 1 }).toArray()),
        await Company.find({ category_code: "music" }, 'name').limit(1).sort({ name: 1 })
    )


});


// Count 
(async function () {

    await mongo_client.connect()

    console.log(
        await collection.countDocuments({ category_code: 'music' })
    )

})()