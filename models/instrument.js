const {Schema} = require('mongoose')

const Instrument = new Schema(
    {
        instrument: {type: String, required: true},
        pieces: [{type: Schema.Types.ObjectId, ref: 'Piece'}],
        type: {type: String, required: true}
    },
    {timestamps: true}
)

module.exports = Instrument