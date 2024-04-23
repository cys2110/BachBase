const {Schema} = require('mongoose')

const Composer = new Schema(
    {
        first_name: {type: String, required: false},
        last_name: {type: String, required: true},
        time_period: {type: Schema.Types.ObjectId, ref: 'Time', autopopulate: {select: 'period'}},
        born: {type: Schema.Types.Mixed, required: false},
        died: {type: Schema.Types.Mixed, required: false},
        nationality: [{type: String, required: false}],
        biography: {type: String, required: false},
        bio_link: {type: String, required: false},
        picture: {type: String, required: false}
    },
    {timestamps: true}
)

Composer.plugin(require('mongoose-autopopulate'))

Composer.virtual('full_name').get(function() {
    return `${this.first_name} ${this.last_name}`
})

Composer.set('toJSON', {virtuals: true})

module.exports = Composer