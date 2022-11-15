const router = require('express').Router()
const Book = require('../schema/Book')

router.get('/', async (req, res) => {

    res.send(await Book.find())
})

router.get('/create', async (req, res) => {
    res.send(await Book.create({
        author: "author 1",
        body: "body 1",
        comments: [{
            body: "body",
            date: new Date()
        }],
        date: new Date(),
        meta: {
            favs: 12,
            votes: 12
        }
    }))
})

router.get('/update/add-comment/:id', async (req, res) => {
    const book = await Book.findOneAndUpdate({
        'comments._id': req.params.id
    }, {
        $push: {
            comments: {
                body: "body" + (Math.random().toFixed(2)),
                date: new Date()
            }
        }
    }, {
        returnOriginal: false
    })
    res.send(book.comments)
})

router.get('/update/edit-comment/:id', async (req, res) => {
    const book = await Book.findOne({
        'comments._id': req.params.id
    })
    book.comments.id(req.params.id).update({
        body: 'edit ',
        date: new Date()
    })
    await book.save()
    res.send(book.comments)
})

router.get('/update/remove-comment/:id', async (req, res) => {
    // return res.send(await Book.findOne({
    //     'comments._id': req.params.id,
    // }))
    const book = await Book.findOneAndUpdate({
        'comments._id': req.params.id,
    }, {
        $pull: {
            'comments': {
                _id: req.params.id
            }
        }
    }, {
        returnOriginal: false
    })
    // book.comments.id(req.params.id).update({
    //     body: 'edit ',
    //     date: new Date()
    // })
    // await book.save()
    res.send(book?.comments)
})
module.exports = router 