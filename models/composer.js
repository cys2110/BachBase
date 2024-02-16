const {Schema} = require('mongoose')

const Composer = new Schema(
    {
        name: {type: String, required: true},
        time_period: {type: Schema.Types.ObjectId, ref: 'Time'},
        born: {type: Number, required: false},
        died: {type: Number, required: false},
        nationality: {type: String, required: true},
        biography: {type: String, required: false},
        bio_link: {type: String, required: false}
    },
    {timestamps: true}
)

module.exports = Composer