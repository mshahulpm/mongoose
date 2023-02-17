const { mongo_client, connect } = require("./connect");

const posts = mongo_client.db("sample_mflix").collection("posts");
const comments = mongo_client.db("sample_mflix").collection("comments");
const comment_replies = mongo_client.db("sample_mflix").collection("comment_replies");


(async () => {
    await mongo_client.connect()

    console.log(
        await posts.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: 'id',
                    foreignField: 'post_id',
                    as: 'comments'
                }
            }, {
                $unwind: '$comments'
            },
            {
                $addFields: {
                    comment_id: "$comments.id"
                }
            },
            {
                $lookup: {
                    from: "comment_replies",
                    localField: 'comment_id',
                    foreignField: 'comment_id',
                    as: 'replies'
                }
            }
        ]).toArray()
    )

    process.exit()
    await posts.insertMany([
        { name: "Post 1", id: 1, code: 'test' },
        { name: "Post 2", id: 2, code: 'test' },
        { name: "Post 3", id: 3, code: 'test' },
    ])

    await comments.insertMany([
        { title: "Comment 1", id: 1, post_id: 1 },
        { title: "Comment 2", id: 2, post_id: 1 },
        { title: "Comment 3", id: 3, post_id: 1 },
        { title: "Comment 4", id: 4, post_id: 2 },
        { title: "Comment 5", id: 5, post_id: 2 },
        { title: "Comment 6", id: 6, post_id: 2 },
    ])

    await comment_replies.insertMany([
        { reply: 'Reply 1', id: 1, comment_id: 1 },
        { reply: 'Reply 2', id: 2, comment_id: 1 },
        { reply: 'Reply 3', id: 3, comment_id: 2 },
        { reply: 'Reply 4', id: 4, comment_id: 3 },
        { reply: 'Reply 5', id: 5, comment_id: 3 },
        { reply: 'Reply 6', id: 6, comment_id: 4 },
    ])

})();



