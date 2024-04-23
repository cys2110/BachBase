const {Composer, Instrument, Piece} = require('../models')

const universalSearch = async(req, res) => {
    try {
        const {search} = req.params
        const regex = new RegExp(search, 'i')
        const composers = await Composer.find({$or: [{first_name: {$regex: regex}}, {last_name: {$regex: regex}}]}).collation({locale: 'en_US', strength: 1})
        const pieces = await Piece.find({$or: [{piece: {$regex: regex}}, {alias: {$regex: regex}}]})
        res.json({composers, pieces})
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getAllPieces = async(req, res) => {
    try {
        const pieces = await Piece.find({})
        if (pieces) {
            res.json(pieces)
        } else {
            return res.status(404).send('Piece does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getPieceById = async(req, res) => {
    try {
        const {id} = req.params
        const piece = await Piece.findById(id)
        if (piece) {
            res.json(piece)
        } else {
            return res.status(404).send('Piece does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const filterPiece = async (req, res) => {
    try {
        const { catalogue, publication, genre, style, tempo, key, instrumentation, composer } = req.query
        const filter = {}
        if (catalogue) filter.opus = catalogue
        if (publication) filter.publication = publication
        if (genre) filter.genre = genre
        if (style) filter.style = style
        if (tempo) filter.tempo = tempo
        if (key) filter.key = key
        if (instrumentation) filter.instrumentation = instrumentation
        if (composer) filter.composer = composer
        const pieces = await Piece.find(filter)
        if (pieces.length > 0) {
            res.json(pieces)
        } else {
            return res.status(404).send('Piece does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getPieceByComposer = async(req, res) => {
    try {
        const {id} = req.params
        const composer = await Composer.findById(id)
        const pieces = await Piece.find({composer: composer._id})
        const sorted = pieces.toSorted((a, b) => {
            return a.piece.localeCompare(b.piece)
        })
        if (pieces) {
            res.json(sorted)
        } else {
            return res.status(404).send('Piece does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getPieceByInstrument = async(req, res) => {
    try {
        const {instrument} = req.params
        const instrumentId = await Instrument.find({instrument: instrument}).collation({locale: 'en_US', strength: 1})
        const pieces = await Piece.find({instrumentation: instrumentId[0]._id})
        const sorted = pieces.toSorted((a, b) => {
            return a.piece.localeCompare(b.piece)
        })
        if (pieces) {
            res.json(sorted)
        } else {
            return res.status(404).send('Piece does not exist')
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createPiece = async(req, res) => {
    try {
        const addPieceToInstrument = (instrumentId, piece) => {
            return Instrument.findByIdAndUpdate(
                instrumentId,
                {$push: {pieces: piece._id}},
                {new: true, useFindAndModify: false}
            )
        }

        const composerFirstName = new RegExp(req.body.first)
        const composerLastName = new RegExp(req.body.last)
        const composer = await Composer.find({first_name: {$regex: composerFirstName}, last_name: {$regex: composerLastName}}).collation({locale: 'en_US', strength: 1})
        const composerId = composer[0]._id
        const piece = await new Piece({
            piece: req.body.piece,
            alias: req.body.alias,
            opus: req.body.opus,
            year: req.body.year,
            key: req.body.key,
            instrumentation: req.body.instrumentation,
            genre: req.body.genre,
            style: req.body.style,
            composer: composerId,
            performance: req.body.performance,
            sheet_music: req.body.sheet_music,
            'about.background': req.body.background,
            'about.analysis': req.body.analysis,
            'about.culture': req.body.culture,
            'about.reception': req.body.reception,
            'about.wiki': req.body.wiki,
            movements: req.body.movements,
            dedicatee: req.body.dedicatee,
            publication: req.body.publication,
            tempo: req.body.tempo
        })
        await piece.save()
        for (let i=0; i<req.body.instrumentation.length; i++) {
            const updateInstrument = await addPieceToInstrument(req.body.instrumentation[i], piece)
        }
        return res.status(201).json({
            piece
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const editPiece = async(req, res) => {
    try {
        const {id} = req.params

        const addPieceToInstrument = (instrumentId, piece) => {
            return Instrument.findByIdAndUpdate(
                instrumentId,
                {$push: {pieces: piece._id}},
                {new: true, useFindAndModify: false}
            )
        }
        let composerId
        if (req.body.last) {
            const composerFirstName = new RegExp(req.body.first)
            const composerLastName = new RegExp(req.body.last)
            const composer = await Composer.find({first_name: {$regex: composerFirstName}, last_name: {$regex: composerLastName}}).collation({locale: 'en_US', strength: 1})
            composerId = composer._id
        }
        let updateFields = {
            piece: req.body.piece,
            alias: req.body.alias,
            opus: req.body.opus,
            year: req.body.year,
            key: req.body.key,
            instrumentation: req.body.instrumentation,
            genre: req.body.genre,
            style: req.body.style,
            composer: composerId,
            performance: req.body.performance,
            sheet_music: req.body.sheet_music,
            'about.background': req.body.background,
            'about.analysis': req.body.analysis,
            'about.culture': req.body.culture,
            'about.reception': req.body.reception,
            'about.wiki': req.body.wiki,
            dedicatee: req.body.dedicatee,
            publication: req.body.publication,
            tempo: req.body.tempo
        }

        if(req.body.movements && req.body.movements.length > 0) {
            updateFields.movements = req.body.movements
        }
        const piece = await Piece.findByIdAndUpdate(id, updateFields)
        if (req.body.instrumentation) {
            for (let i=0; i<req.body.instrumentation.length; i++) {
                const instrument = await Instrument.find({_id: req.body.instrumentation[i], pieces: id})
                if (instrument.length === 0) {
                    const updateInstrument = await addPieceToInstrument(req.body.instrumentation[i], piece)
                }
            }
        }
        if (piece) {
            return res.status(200).json(piece)
        }
        throw new Error('Piece not found')
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deletePiece = async(req, res) => {
    try {
        const {id} = req.params
        const deleted = await Piece.findByIdAndDelete(id)
        if(deleted) {
            return res.status(200).send('Piece deleted')
        }
        throw new Error('Piece not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getAllPieces,
    getPieceByComposer,
    getPieceByInstrument,
    getPieceById,
    deletePiece,
    createPiece,
    editPiece,
    universalSearch,
    filterPiece
}