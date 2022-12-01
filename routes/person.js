const { Person, MetaData } = require('../schema/other')

const router = require('express').Router()


router.get('/', async (req, res) => {
    res.json(await Person.find().populate('other_data friends_data'))
})

router.get('/:id', async (req, res) => {
    res.json(await Person.findById(req.params.id).populate('friends_data'))
})

router.post('/', async (req, res) => {
    const count = await Person.count()
    res.json(await Person.create({
        age: 27,
        name: 'Name ' + count,
        place: 'Place',
        application_no: count + 100
    }))
})

router.post('/add-friends', async (req, res) => {
    res.json(await Person.findByIdAndUpdate(req.body.id, {
        $push: { friends: req.body.friends }
    }))
})

router.get('/meta', async (req, res) => {
    res.json(await MetaData.find().populate('person'))
})


router.post('/meta', async (req, res) => {
    res.json(await MetaData.create(req.body))
})


module.exports = router 