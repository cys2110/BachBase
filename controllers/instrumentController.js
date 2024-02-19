const {Instrument} = require('../models')

const getAllInstruments = async(req, res) => {
    try {
        const instruments = await Instrument.find({}).populate({path: 'pieces', select: 'piece'})
        res.json(instruments)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getInstrumentByType = async(req, res) => {
    try {
        const {type} = req.params
        const regex = new RegExp(type, 'i')
        const instruments = await Instrument.find({type: {$regex: regex}}).populate({path: 'pieces', select: 'piece'})
        const sorted = instruments.toSorted((a, b) => {
            return a.instrument.localeCompare(b.instrument)
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