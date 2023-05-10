import 'dotenv/config'
import mongoose from 'mongoose'
import { fieldEncryption, encrypt, decrypt } from 'mongoose-field-encryption'
import crypto from 'crypto'

const SECRET = "some secret key"
function defaultSaltGenerator(secret) {


    // return crypto.randomBytes(16) // if searching is not required
    return "1234567890123456"     // if searching required 
    // should ideally use the secret to return a string of length 16, 
    // default = `const defaultSaltGenerator = secret => crypto.randomBytes(16);`, 
    // see options for more details
}
const _hash = (secret) => crypto.createHash("sha256").update(secret).digest("hex").substring(0, 32);

// const encrypted = encrypt("New Message", _hash(SECRET), defaultSaltGenerator)
// console.log(encrypted);
// const decrypted = decrypt(encrypted, _hash(SECRET))
// console.log(decrypted)

const PostSchema = new mongoose.Schema({
    title: String,
    message: String,
    references: {
        author: String,
        date: Date,
    },
})


// process.exit()


PostSchema.plugin(fieldEncryption, {
    fields: ["message", "references"],
    secret: SECRET,
    saltGenerator: defaultSaltGenerator,
});
const Post = mongoose.model("Post", PostSchema);


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


mongoose.connect(process.env.mongo_url, async (err) => {

    if (err) console.log(err)
    else {
        console.log('db connected')
        await main()
    }

})