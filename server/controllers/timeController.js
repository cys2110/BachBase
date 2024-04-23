const {Time} = require('../models')

const collation = {
    locale: 'en',
    strength: 2
}

const getAllTimes = async(req, res) => {
    try {
        const times = await Time.find({})
        res.json(times)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getTimeByName = async(req, res) => {
    try {
        const { time } = req.params
        const regex = new RegExp(time, 'i')
        const timePeriod = await Time.find({period: {$regex: regex}}).collation(collation)
        if(timePeriod) {
            res.json(timePeriod)
        } else {
            return res.status(404).send('Time period does not exist')
        }
    } catch(error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllTimes,
    getTimeByName
}