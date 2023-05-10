import 'dotenv/config'
import mongoose from 'mongoose'
import * as fs from 'fs'
import { Post } from './model/post.mjs'
import { User } from './model/user.mjs'


async function main() {


    const post = await Post.create({
        title: "New Post",
        message: "New Message",
        references: {
            author: "Author name",
            date: new Date(),
        },
    })

    const searchObj = new Post({ message: 'new' })//.encryptFieldsSync()
    searchObj.encryptFieldsSync()


    // return

    const searchRegex = new RegExp(searchObj.message.slice(0, 3), 'i')

    console.log(
        // post,
        searchObj.message,
        await Post.find({
            message: {
                $regex: searchRegex
            }
        })
    )

}
// 1683730803201
async function loadUser() {

    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))

    var i = 100000
    console.log(Date.now())
    console.time('data-insert')
    for (; i < 1000000; i + 100000) {
        const dataToInsert = users.slice(i, i + 100000)
        await User.create(dataToInsert)
    }
    console.timeEnd('data-insert')

}


mongoose.connect(process.env.mongo_url, async (err) => {

    if (err) console.log(err)
    else {
        console.log('db connected')
        // await main()
        await loadUser()
    }

})