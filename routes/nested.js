const { Nested } = require('../schema/Nested')

const router = require('express').Router()

router.get("/:id", async (req, res) => {
    res.json(await Nested.findById(req.params.id))
})

router.post('/', async (req, res) => {
    res.json(await Nested.create(req.body))
})

router.patch('/:id', async (req, res) => {
    res.json(await Nested.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true }))
})

router.delete('/:id', async (req, res) => {
    res.json(await Nested.findByIdAndDelete(req.params.id))
})


module.exports = router