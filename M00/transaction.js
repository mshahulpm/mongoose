const { connect, mongo_client } = require("./connect")
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");

const users = mongo_client.db('bank').collection('users');


(async function () {

    await mongo_client.connect()

    const transactionOptions = {
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' },
        readPreference: 'primary'
    };

    const session = await mongo_client.startSession()
    const amount_to_transfer = 200
    try {

        // start transaction 
        session.startTransaction(transactionOptions);

        //   deduct from user 1 
        const debit = await users.findOneAndUpdate(
            { name: 'shahul', balance: { $gte: amount_to_transfer } },
            { $inc: { balance: -amount_to_transfer } },
            { session, returnDocument: "after" }
        )
        if (!debit?.value) throw new Error('Insufficient fund/user does not exist')

        const credit = await users.findOneAndUpdate(
            { name: 'hisham' },
            { $inc: { balance: amount_to_transfer } },
            { session, returnDocument: "after" }
        )
        if (!credit?.value) throw new Error('No user found to deposit')

        console.log({ debit, credit })

        // finish transaction 
        await session.commitTransaction();

    } catch (error) {
        console.log(error)
        // abort transaction 
        await session.abortTransaction()
        console.log(
            'after transaction fail',
            await users.find().toArray()
        )
    } finally {
        await session.endSession()
    }

})()