const mongoose = require('mongoose')
const pw = require('../config')

mongoose
    .connect(`mongodb+srv://cys2110:${pw}@bachbase.b8ugtms.mongodb.net/bachbase?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Successfully connected to MongoDB')
    })
    .catch((e) => {
        console.error('Connection error', e.message)
    })

mongoose.set('debug', true)

const db = mongoose.connection

module.exports = db