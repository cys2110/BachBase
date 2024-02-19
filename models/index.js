const mongoose = require('mongoose')
const TimeSchema = require('./time')
const ComposerSchema = require('./composer')
const PieceSchema = require('./piece')
const InstrumentSchema = require('./instrument')

const Time = mongoose.model('Time', TimeSchema)
const Composer = mongoose.model('Composer', ComposerSchema)
const Piece = mongoose.model('Piece', PieceSchema)
const Instrument = mongoose.model('Instrument', InstrumentSchema)

module.exports = {
    Time,
    Composer,
    Piece,
    Instrument
}