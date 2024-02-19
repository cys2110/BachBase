const {Composer, Time} = require('../models')

const getAllComposers = async(req, res) => {
    try {
        const composers = await Composer.find({}).populate({path: 'time_period', select: 'period'})
        res.json(composers)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getComposerById = async(req, res) => {
    try {
        const {id} = req.params
        const composer = await Composer.findById(id).populate({path: 'time_period', select: 'period'})
        if (composer) {
            res.json(composer)
        } else {
            return res.status(404).send('Composer does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getComposersByLastNameLetter = async(req, res) => {
    try {
        const {letter} = req.params
        const composers = await Composer.find({})
        const filtered = composers.filter(item => item.last_name.startsWith(letter.toUpperCase()))
        const sorted = filtered.toSorted((a, b) => {
            return a.last_name.localeCompare(b.last_name)
        })
        if (sorted) {
            res.json(sorted)
        } else {
            return res.status(404).send('Composer does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getComposerByTime = async(req, res) => {
    try {
        const {time} = req.params
        const regex = new RegExp(time, 'i')
        const timePeriod = await Time.find({period: {$regex: regex}})
        const composers = await Composer.find({time_period: timePeriod[0]._id}).populate({path: 'time_period', select: 'period'})
        const sorted = composers.toSorted((a, b) => {
            return a.last_name.localeCompare(b.last_name)
        })
        if(sorted) {
            res.json(sorted)
        } else {
            return res.status(404).send('Composer does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const isValidDate = (dateString) => {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
}

const createComposer = async(req, res) => {
    try {
        const period = new RegExp(req.body.time_period, 'i')
        const time = await Time.find({period: {$regex: period}})
        let born
        let died
        if (isValidDate(req.body.born)) {
            born = new Date(req.body.born)
        } else {
            born = req.body.born
        }
        if (isValidDate(req.body.died)) {
            died = new Date(req.body.died)
        } else {
            died = req.body.died
        }
        const composer = await new Composer({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            time_period: time[0]._id,
            born: born,
            died: died,
            nationality: req.body.nationality,
            biography: req.body.bio,
            bio_link: req.body.link,
            picture: req.body.picture
        })
        await composer.save()
        return res.status(201).json({
            composer
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const editComposer = async(req, res) => {
    try {
        const {id} = req.params
        let timePeriod
        if (req.body.time_period) {
            const period = new RegExp(req.body.time_period, 'i')
            const time = await Time.find({period: {$regex: period}})
            if (time.length > 0) {
                timePeriod = time[0]._id
            }
        }
        let born
        let died
        if (req.body.born) {
            if (isValidDate(req.body.born)) {
                born = new Date(req.body.born)
            } else {
                born = req.body.born
            }
        }
        if (req.body.died) {
            if (isValidDate(req.body.died)) {
                died = new Date(req.body.died)
            } else {
                died = req.body.died
            }
        }
        
        const composer = await Composer.findByIdAndUpdate(id, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            time_period: timePeriod,
            born: born,
            died: died,
            nationality: req.body.nationality,
            biography: req.body.bio,
            bio_link: req.body.link,
            picture: req.body.picture
        })
        if (composer) {
            return res.status(200).json(composer)
        }
        throw new Error('Composer not found')
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteComposer = async(req, res) => {
    try {
        const {id} = req.params
        const deleted = await Composer.findByIdAndDelete(id)
        if(deleted) {
            return res.status(200).send('Composer deleted')
        }
        throw new Error('Composer not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllComposers,
    getComposerByTime,
    getComposersByLastNameLetter,
    getComposerById,
    createComposer,
    editComposer,
    deleteComposer
}