const {Instrument} = require('../models')

const collation = {
    locale: 'en',
    strength: 2
}

const getAllInstruments = async(req, res) => {
    try {
        const instruments = await Instrument.find({})
        res.json(instruments)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getInstrumentByType = async(req, res) => {
    try {
        const {type} = req.params
        const regex = new RegExp(type, 'i')
        const instruments = await Instrument.find({type: {$regex: regex}}).collation(collation)
        const sorted = instruments.toSorted((a, b) => {
            return b.instrument.localeCompare(a.instrument)
        })
        if (sorted) {
            res.json(sorted)
        } else {
            return res.status(404).send('Instrument does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllInstruments,
    getInstrumentByType
}