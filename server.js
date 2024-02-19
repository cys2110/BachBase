const express = require('express')
const db = require('./db')
const logger = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(bodyParse.json())

const timeController = require('./controllers/timeController')
const composerController = require('./controllers/composerController')
const pieceController = require('./controllers/pieceController')
const instrumentController = require('./controllers/instrumentController')

app.get('/', (req, res) => res.send('sheet music database'))
app.get('/search/:search', pieceController.universalSearch)

app.get('/time-periods', timeController.getAllTimes)
app.get('/time-periods/:time', timeController.getTimeByName)

app.get('/composers', composerController.getAllComposers)
app.get('/composers/id/:id', composerController.getComposerById)
app.get('/composers/time-period/:time', composerController.getComposerByTime)
app.get('/composers/letter/:letter', composerController.getComposersByLastNameLetter)
app.post('/composers', composerController.createComposer)
app.patch('/composers/id/:id', composerController.editComposer)
app.delete('/composers/id/:id', composerController.deleteComposer)

app.get('/instrumentation', instrumentController.getAllInstruments)
app.get('/instrumentation/:type', instrumentController.getInstrumentByType)

app.get('/pieces', pieceController.getAllPieces)
app.get('/pieces/id/:id', pieceController.getPieceById)
app.get('/pieces/composer/:id', pieceController.getPieceByComposer)
app.get('/pieces/instrument/:instrument', pieceController.getPieceByInstrument)
app.post('/pieces', pieceController.createPiece)
app.patch('/pieces/id/:id', pieceController.editPiece)
app.delete('/pieces/id/:id', pieceController.deletePiece)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))