const { User } = require('../schema/Book')
const router = require('express').Router()


router.post('/', async (req, res) => {
    res.json(await User.create(req.body))
})


router.get('/', async (req, res) => {
    res.json(await User.find())
})

router.get('/with-books', async (req, res) => {
    res.json(await User.find().populate('post'))
})


router.get('/:id', async (req, res) => {
    res.json(await User.findById(req.params.id).populate('post'))
})



module.exports = router 