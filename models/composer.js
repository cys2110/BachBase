const {Schema} = require('mongoose')

const Composer = new Schema(
    {
        first_name: {type: String, required: false},
        last_name: {type: String, required: true},
        time_period: {type: Schema.Types.ObjectId, ref: 'Time'},
        born: {type: Schema.Types.Mixed, required: false},
        died: {type: Schema.Types.Mixed, required: false},
        nationality: [{type: String, required: false}],
        biography: {type: String, required: false},
        bio_link: {type: String, required: false},
        picture: {type: String, required: false}
    },
    {timestamps: true}
)

module.exports = Composer