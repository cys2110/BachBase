const {Schema} = require('mongoose')

const Time = new Schema(
    {
        period: {type: String, required: true},
        span: {type: String, required: true},
        description: {type: String, required: true}
    },
    {timestamps: true}
)

module.exports = Time