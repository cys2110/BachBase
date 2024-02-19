const { create } = require('domain')
const db = require('../db')
const {Piece, Instrument, Composer} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {

    // const aist = await Composer.find({first_name: 'Dietmar'})
    // const alfonso = await Composer.find({last_name: 'Alfonso X of Castile'})
    // const alanus = await Composer.find({last_name: 'Alanus'})
    // const cecco = await Composer.find({last_name: 'Angiolieri'})
    // const guido = await Composer.find({last_name: 'Guido of Arezzo'})
    // const antonello = await Composer.find({first_name: 'Antonello'})
    // const aquinas = await Composer.find({last_name: 'Aquinas'})
    // const piano = await Instrument.find({instrument: 'Piano'})
    // const voice = await Instrument.find({instrument: 'Voice'})

    const createInstrument = (instrument) => {
        return Instrument.create(instrument)
    }

    const createPiece = (piece) => {
        return Piece.create(piece)
    }

    const addInstrumentToPiece = (pieceId, instrument) => {
        return Piece.findByIdAndUpdate(
            pieceId,
            {$push: {instrumentation: instrument._id}},
            {new: true, useFindAndModify: false}
        )
    }

    const addPieceToInstrument = (instrumentId, piece) => {
        return Instrument.findByIdAndUpdate(
            instrumentId,
            {$push: {pieces: piece._id}},
            {new: true, useFindAndModify: false}
        )
    }

    // const friedel = await createPiece ({
    //     piece: 'Slâfest du, friedel ziere',
    //     genre: 'Songs',
    //     composer: aist[0]._id,
    //     instrumentation: [voice[0]._id, piano[0]._id],
    //     performance: {
    //         link: 'https://www.youtube.com/watch?v=m9k7xzMoTZA',
    //         performer: 'Werkraum'
    //     },
    //     sheet_music: 'https://vmirror.imslp.org/files/imglnks/usimg/b/ba/IMSLP796936-PMLP1257939-Drei_Deutsche_Lieder_.pdf'
    // })

    // const fons = await createPiece({
    //     piece: 'Fons citharizancium - Sub Arturo - In omnem terram',
    //     genre: 'Motets',
    //     composer: alanus[0]._id,
    //     instrumentation: [voice[0]._id],
    //     style: 'Medieval',
    //     performance: {
    //         link: 'https://www.youtube.com/watch?v=7PcUQ5czs9Q',
    //         performer: 'Steven Harrold, Tim Travers-Brown, Dominic Bland, George Pooley, James Hall, Matthew Vine'
    //     },
    //     sheet_music: 'https://vmirror.imslp.org/files/imglnks/usimg/0/07/IMSLP44457-PMLP95591-Alanus_Fons_citharizancium.pdf'
    // })

    // const toledo = await createPiece({
    //     piece: 'Santa Maria, strela do dia',
    //     genre: 'Cantigas',
    //     composer: alfonso[0]._id,
    //     instrumentation: [voice[0]._id],
    //     style: 'Medieval',
    //     performance: {
    //         link: 'https://www.youtube.com/watch?v=hCGyDmclpS8',
    //         performer: 'Amanda Powell, Brian Kay'
    //     },
    //     sheet_music: 'https://vmirror.imslp.org/files/imglnks/usimg/8/85/IMSLP242754-WIMA.d58c-Sabio_Santa-Maria-strela-do-dia.pdf'
    // })

    // const rime = await createPiece({
    //     piece: 'Rime di Cecco Angiolieri',
    //     genre: 'Songs',
    //     composer: cecco[0]._id,
    //     instrumentation: [voice[0]._id, piano[0]._id],
    //     style: 'Medieval',
    //     performance: {
    //         link: 'https://www.youtube.com/watch?v=6YpHu40dV-4',
    //         performer: 'Davide Verotta'
    //     },
    //     sheet_music: 'https://vmirror.imslp.org/files/imglnks/usimg/7/75/IMSLP802669-PMLP1265916-O.15.pdf'
    // })

    // const queant = await createPiece({
    //     piece: 'Ut Queant Laxis',
    //     genre: 'Sacred hymns',
    //     composer: guido[0]._id,
    //     instrumentation: [voice[0]._id],
    //     style: 'Medieval',
    //     performance: {
    //         link: 'https://www.youtube.com/watch?v=viu-PhML3D8',
    //         performer: 'Donna Stewart'
    //     },
    //     sheet_music: 'https://vmirror.imslp.org/files/imglnks/usimg/9/92/IMSLP528673-PMLP235667-d\'Arezzo_-_Ut_queant_laxis.pdf'
    // })

    // const piu = await createPiece({
    //     piece: 'Piu chiar che \'l sol in lo mio cor',
    //     composer: antonello[0]._id,
    //     instrumentation: [voice[0]._id],
    //     style: 'Medieval',
    //     performance: {
    //         link: 'https://www.youtube.com/watch?v=s1mt8fW-T2g',
    //         performer: 'Mala Punica'
    //     },
    //     sheet_music: 'https://vmirror.imslp.org/files/imglnks/usimg/b/b5/IMSLP875791-PMLP1377985-Antonello_da_Caserta_-_Piu_chiar_che\'l_sol.pdf'
    // })
}

const run = async() => {
    await main()
    db.close()
}

run()