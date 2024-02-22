const {Schema} = require('mongoose')

const Piece = new Schema(
    {
        piece: {type: String, required: true},
        alias: {type: String, required: false},
        opus: {type: String, required: false},
        year: {type: Schema.Types.Mixed, required: false},
        key: {type: String, required: false},
        instrumentation: [{type: Schema.Types.ObjectId, ref: 'Instrument'}],
        genre: [{type: String, required: false}],
        style: {type: String, required: false},
        composer: {type: Schema.Types.ObjectId, ref: 'Composer'},
        performance: {
            link: {type: String, required: false},
            performer: {type: String, required: false}
        },
        sheet_music: {type: String, required: true},
        about: {
            background: {type: String, required: false},
            analysis: {type: String, required: false},
            culture: {type: String, required: false},
            reception: {type: String, required: false},
            wiki: {type: String, required: false}
        },
        movements: [{
            movement_name: {type: String, required: false},
            tempo: {type: String, required: false},
            key: {type: String, required: false},
            analysis: {type: String, required: false}
        }],
        dedicatee: {type: String, required: false},
        publication: {type: Number, required: false},
        tempo: {type: String, required: false}
    },
    {timestamps: true}
)

module.exports = Piece