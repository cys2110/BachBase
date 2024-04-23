const {Schema} = require('mongoose')

const Instrument = new Schema(
    {
        instrument: {type: String, required: true},
        pieces: [{type: Schema.Types.ObjectId, ref: 'Piece', autopopulate: {select: 'piece composer'}}],
        type: {type: String, required: true}
    },
    {timestamps: true}
)

Instrument.plugin(require('mongoose-autopopulate'))

module.exports = Instrument