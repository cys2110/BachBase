const {Schema} = require('mongoose')

const Piece = new Schema(
    {
        piece: {type: String, required: true},
        alias: {type: String, required: false},
        opus: {type: String, required: false},
        year: {type: Number, required: false},
        key: {type: String, required: false},
        instrumentation: [{type: Schema.Types.ObjectId, ref: 'Instrument'}],
        genre: {type: String, required: false},
        composer: {type: Schema.Types.ObjectId, ref: 'Composer'},
        Performance: {type: String, required: false},
        sheet_music: {type: String, required: true}
    },
    {timestamps: true}
)

module.exports = Piece