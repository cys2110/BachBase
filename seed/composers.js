const db = require('../db')              
const {Time, Composer} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    const baroque = await Time.find({period: 'Baroque'})
    const romantic = await Time.find({period: 'Romantic'})
    const modernism = await Time.find({period: 'Modernism'})

    const composers = [
        {
            first_name: 'Marc\'Antonio',
            last_name: 'Ziani',
            time_period: baroque[0]._id,
            born: 'c. 1653',
            died: new Date(1715, 1, 22),
            nationality: 'Italy',
            biography: 'Marc\'Antonio Ziani was an Italian composer living in Vienna. Ziani was born in Venice. He probably studied with his uncle, the organist Pietro Andrea Ziani. From 1686 to 1691 Ziani was maestro di cappella to Duke Ferdinando Carlo di Gonzaga in Mantua, but simultaneously developed his career as an opera composer in Venice. In 1700 Ziani was appointed vice Hofkapellmeister to Leopold I in Vienna, and on 1 January 1712 Charles VI promoted him to Hofkapellmeister. He was succeeded by Johann Fux. He died in Vienna.',
            bio_link: 'https://en.wikipedia.org/wiki/Marc%27Antonio_Ziani',
            picture: 'https://lastfm.freetls.fastly.net/i/u/300x300/20abdcd9969fe9338d425fe9d6b59c85.jpg'
        },
        {
            first_name: 'Pietro Andrea',
            last_name: 'Ziani',
            time_period: baroque[0]._id,
            born: new Date(1616, 12, 21),
            died: new Date(1684, 2, 2),
            nationality: 'Italy',
            biography: 'Pietro Andrea Ziani was an Italian organist and composer. He was the uncle of Marc\'Antonio Ziani. Beginning in 1669, he was the organist at St Mark\'s Basilica and later moved on to serve Eleonor Magdalene of Neuburg in Vienna. His works included "L\'Assalone punito" (1667) and the operas "La ricreazione burlesca" (1663), "L\'invidia conculcata della virtù, merito, virtù, merito, valore di Leopoldo imperatore" (1664), "Cloridea" (1665), "Circe" (1665), "L\'Elice" (1666) and "La Galatea" (1667).',
            bio_link: 'https://en.wikipedia.org/wiki/Pietro_Andrea_Ziani'
        },
        {
            first_name: 'Géza',
            last_name: 'Zichy',
            time_period: romantic[0]._id,
            born: new Date(1849, 7, 23),
            died: new Date(1924, 1, 14),
            nationality: 'Hungary',
            biography: 'Géza Zichy was a Hungarian composer and was also renowned as the world\'s first professional one-armed pianist. Zichy also published an autobiography ("Aus meinem Leben", 3 vols, 1911-24) and some poetry.',
            bio_link: 'https://en.wikipedia.org/wiki/G%C3%A9za_Zichy',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Zichy_G%C3%A9za.jpg'
        },
        {
            first_name: 'Harry H.',
            last_name: 'Zickel',
            time_period: modernism[0]._id
        },
        {
            first_name: 'Florenz',
            last_name: 'Ziegfeld',
            time_period: romantic[0]._id,
            born: new Date(1867, 3, 21),
            died: new Date(1932, 7, 22),
            nationality: 'USA',
            biography: 'Florenz Edward Ziegfeld Jr. was an American Broadway impresario, notable for his series of theatrical revues, the Ziegfeld Follies (1907-1931), inspired by the Folies Bergère of Paris. He also produced the musical Show Boat. He was known as the "glorifier of the American girl". Ziegfeld is a member of the American Theater Hall of Fame.',
            bio_link: 'https://en.wikipedia.org/wiki/Florenz_Ziegfeld_Jr.',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Florenz-Ziegfeld-1928.jpg/440px-Florenz-Ziegfeld-1928.jpg'
        },
        {
            first_name: 'Antonello',
            last_name: 'da Caserta',
            time_period: medieval[0]._id,
            nationality: 'Italy',
            biography: 'Antonello da Caserta, also Anthonello de Casetta, Antonellus Marot, was an Italian composer of the medieval era, active in the late 14th and early 15th centuries.',
            bio_link: 'https://en.wikipedia.org/wiki/Antonello_da_Caserta'
        },
        {
            last_name: 'Armonizabit',
            time_period: medieval[0]._id
        },
        {
            first_name: 'Yikihira',
            last_name: 'Ariwara no',
            time_period: medieval[0]._id,
            born: 818,
            died: 893,
            nationality: 'Japan',
            biography: 'Ariwara no Yukihira was a Japanese Heian period courtier and bureaucrat, who held a number of positions over the course of his life. At one time or another, he was governor of the provinces of Harima, Bizen, Shinano, and Bitchū. He also served as Councillor, Minister of Agriculture, and inspector (azechi) of Mutsu and Dewa provinces.',
            bio_link: 'https://en.wikipedia.org/wiki/Ariwara_no_Yukihira'
        },
        {
            last_name: 'Guido of Arezzo',
            time_period: medieval[0]._id,
            born: 'c.991-992',
            died: 'after 1033',
            nationality: 'Italy',
            biography: 'Guido of Arezzo was an Italian music theorist and pedagogue of High medieval music. A Benedictine monk, he is regarded as the inventor—or by some, developer—of the modern staff notation that had a massive influence on the development of Western musical notation and practice. Perhaps the most significant European writer on music between Boethius and Johannes Tinctoris, after the former\'s De institutione musica, Guido\'s Micrologus was the most widely distributed medieval treatise on music.',
            bio_link: 'https://en.wikipedia.org/wiki/Guido_of_Arezzo'
        },
        {
            first_name: 'Thomas',
            last_name: 'Aquinas',
            time_period: medieval[0]._id,
            born: 'c. 1225',
            died: new Date(1274, 3, 7),
            nationality: 'Italy',
            biography: 'Thomas Aquinas (Order of Preachers) was an Italian Dominican friar and priest, an influential philosopher and theologian, and a jurist in the tradition of scholasticism from the county of Aquino in the Kingdom of Sicily.',
            bio_link: 'https://en.wikipedia.org/wiki/Thomas_Aquinas'
        }
    ]

    await Composer.insertMany(composers)
    console.log('inserted')
}

const run = async() => {
    await main()
    db.close()
}

run()