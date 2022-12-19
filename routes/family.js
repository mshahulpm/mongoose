const { Family, People } = require('../schema/familytree')
const data = require('../constants/family')

const router = require('express').Router()

router.get('/init', async (req, res) => {
    if (!(await People.count())) {
        await People.create(data.users)
    }
    if (!(await Family.count())) {
        await Family.create(data.relation)
    }
    res.json({ message: 'database initiated' })
})

router.get('/delete', async (req, res) => {
    await People.deleteMany()
    await Family.deleteMany()
    res.json({ message: 'database reset success' })
})

router.route('/user')
    .get(async (req, res) => {
        res.json(await People.find())
    })

router.get('/relation', async (req, res) => {
    res.json(await Family.find())
})


router.get('/tree/:app_no', async (req, res) => {
    const { app_no } = req.params
    res.json(await Family.find({
        $or: [
            { father: app_no },
            { mother: app_no },
        ]
    }))
})




module.exports = router 