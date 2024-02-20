const db = require('../db')              
const {Time, Composer} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    const baroque = await Time.find({period: 'Baroque'})
    const romantic = await Time.find({period: 'Romantic'})
    const modernism = await Time.find({period: 'Modernism'})
    const classical = await Time.find({period: 'Classical'})

    const composers = [
        {
            first_name: 'Ludwig',
            last_name: 'van Beethoven',
            time_period: classical[0]._id,
            born: new Date(1770, 12, 16),
            died: new Date(1827, 3, 26),
            nationality: 'Germany',
            biography: 'Ludwig van Beethoven was a German composer and pianist. He is one of the most revered figures in the history of Western music; his works rank among the most performed of the classical music repertoire and span the transition from the Classical period to the Romantic era in classical music. Beethoven\'s career has conventionally been divided into early, middle, and late periods. His early period, during which he forged his craft, is typically considered to have lasted until 1802. From 1802 to around 1812, his middle period showed an individual development from the styles of Joseph Haydn and Wolfgang Amadeus Mozart, and is sometimes characterized as heroic. During this time, he began to grow increasingly deaf. In his late period, from 1812 to 1827, he extended his innovations in musical form and expression.',
            bio_link: 'https://en.wikipedia.org/wiki/Ludwig_van_Beethoven',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg/440px-Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg'
        },
        {
            first_name: 'Wolfgang Amadeus',
            last_name: 'Mozart',
            time_period: classical[0]._id,
            born: new Date(1756, 1, 27),
            died: new Date(1791, 12, 5),
            nationality: 'Austria',
            biography: 'Wolfgang Amadeus Mozart was a prolific and influential composer of the Classical period. Despite his short life, his rapid pace of composition resulted in more than 800 works of virtually every Western classical genre of his time. Many of these compositions are acknowledged as pinnacles of the symphonic, concertante, chamber, operatic, and choral repertoire. Mozart is widely regarded as among the greatest composers in the history of Western music, with his music admired for its "melodic beauty, its formal elegance and its richness of harmony and texture".',
            bio_link: 'https://en.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Mozart_Portrait_Croce.jpg/440px-Mozart_Portrait_Croce.jpg'
        },
        {
            first_name: 'Pyotr',
            last_name: 'Tchaikovsky',
            time_period: romantic[0]._id,
            born: new Date(1840, 5, 7),
            died: new Date(1893, 11, 6),
            nationality: 'Russia',
            biography: 'Pyotr Ilyich Tchaikovsky was a Russian composer of the Romantic period. He was the first Russian composer whose music would make a lasting impression internationally. Tchaikovsky wrote some of the most popular concert and theatrical music in the current classical repertoire, including the ballets Swan Lake and The Nutcracker, the 1812 Overture, his First Piano Concerto, Violin Concerto, the Romeo and Juliet Overture-Fantasy, several symphonies, and the opera Eugene Onegin.',
            bio_link: 'https://en.wikipedia.org/wiki/Pyotr_Ilyich_Tchaikovsky',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Tchaikovsky_by_Reutlinger_%28cropped%29.jpg/440px-Tchaikovsky_by_Reutlinger_%28cropped%29.jpg'
        },
        {
            first_name: 'Johannes',
            last_name: 'Brahms',
            time_period: romantic[0]._id,
            born: new Date(1833, 5, 7),
            died: new Date(1897, 4, 3),
            nationality: 'Germany',
            biography: 'Johannes Brahms was a German composer, pianist, and conductor of the mid-Romantic period. Born in Hamburg into a Lutheran family, he spent much of his professional life in Vienna. He is sometimes grouped with Johann Sebastian Bach and Ludwig van Beethoven as one of the "Three Bs" of music, a comment originally made by the nineteenth-century conductor Hans von Bülow.',
            bio_link: 'https://en.wikipedia.org/wiki/Johannes_Brahms',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/1/15/JohannesBrahms.jpg'
        },
        {
            first_name: 'Antonio',
            last_name: 'Vivaldi',
            time_period: baroque[0]._id,
            born: new Date(1678, 4, 3),
            died: new Date(1741, 7, 28),
            nationality: 'Italy',
            biography: 'Antonio Lucio Vivaldi was an Italian composer, virtuoso violinist and impresario of Baroque music. Along with Johann Sebastian Bach and George Frideric Handel, Vivaldi ranks amongst the greatest Baroque composers and his influence during his lifetime was widespread across Europe, giving origin to many imitators and admirers. He pioneered many developments in orchestration, violin technique and programmatic music. He consolidated the emerging concerto form into a widely accepted and followed idiom.',
            bio_link: 'https://en.wikipedia.org/wiki/Antonio_Vivaldi',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Vivaldi.jpg/440px-Vivaldi.jpg'
        },
        {
            first_name: 'Joseph',
            last_name: 'Haydn',
            time_period: classical[0]._id,
            born: new Date(1732, 3, 31),
            died: new Date(1809, 5, 31),
            nationality: 'Austria',
            biography: 'Franz Joseph Haydn was an Austrian composer of the Classical period. He was instrumental in the development of chamber music such as the string quartet and piano trio. His contributions to musical form have led him to be called "Father of the Symphony" and "Father of the String quartet".',
            bio_link: 'https://en.wikipedia.org/wiki/Joseph_Haydn',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Joseph_Haydn.jpg/440px-Joseph_Haydn.jpg'
        },
        {
            first_name: 'Franz',
            last_name: 'Schubert',
            time_period: romantic[0]._id,
            born: new Date(1797, 1, 31),
            died: new Date(1828, 11, 19),
            nationality: 'Austria',
            biography: 'Franz Peter Schubert was an Austrian composer of the late Classical and early Romantic eras. Despite his short life, Schubert left behind a vast oeuvre, including more than 600 secular vocal works (mainly lieder), seven complete symphonies, sacred music, operas, incidental music, and a large body of piano and chamber music. His major works include the art songs Erlkönig, Gretchen am Spinnrade, Ave Maria; the Trout Quintet, the unfinished Symphony No. 8 in B minor, the "Great" Symphony No. 9 in C major, the String Quartet No. 14 "Death and the Maiden", a String Quintet, the two sets of Impromptus for solo piano, the three last piano sonatas, the Fantasia in F minor for piano four hands, the opera Fierrabras, the incidental music to the play Rosamunde, and the song cycles Die schöne Müllerin, Winterreise and Schwanengesang.',
            bio_link: 'https://en.wikipedia.org/wiki/Franz_Schubert',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Franz_Schubert_by_Wilhelm_August_Rieder_1875_larger_version.png/440px-Franz_Schubert_by_Wilhelm_August_Rieder_1875_larger_version.png'
        },
        {
            first_name: 'Felix',
            last_name: 'Mendelssohn',
            time_period: romantic[0]._id,
            born: new Date(1809, 2, 3),
            died: new Date(1847, 11, 4),
            nationality: 'Germany',
            biography: 'Jakob Ludwig Felix Mendelssohn Bartholdy, widely known as Felix Mendelssohn, was a German composer, pianist, organist and conductor of the early Romantic period. Mendelssohn\'s compositions include symphonies, concertos, piano music, organ music and chamber music. His best-known works include the overture and incidental music for A Midsummer Night\'s Dream (which includes his "Wedding March"), the Italian Symphony, the Scottish Symphony, the oratorio St. Paul, the oratorio Elijah, the overture The Hebrides, the mature Violin Concerto, the String Octet, and the melody used in the Christmas carol "Hark! The Herald Angels Sing". Mendelssohn\'s Songs Without Words are his most famous solo piano compositions.',
            bio_link: 'https://en.wikipedia.org/wiki/Felix_Mendelssohn',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Felix_Mendelssohn_Bartholdy.jpg/440px-Felix_Mendelssohn_Bartholdy.jpg'
        },
        {
            first_name: 'George Frideric',
            last_name: 'Handel',
            time_period: baroque[0]._id,
            born: new Date(1685, 2, 23),
            died: new Date(1759, 4, 14),
            nationality: 'Germany; England',
            biography: 'George Frideric (or Frederick) Handel was a German-British Baroque composer well known for his operas, oratorios, anthems, concerti grossi, and organ concertos. Handel received his training in Halle and worked as a composer in Hamburg and Italy before settling in London in 1712, where he spent the bulk of his career and became a naturalised British subject in 1727. He was strongly influenced both by the middle-German polyphonic choral tradition and by composers of the Italian Baroque. In turn, Handel\'s music forms one of the peaks of the "high baroque" style, bringing Italian opera to its highest development, creating the genres of English oratorio and organ concerto, and introducing a new style into English church music. He is consistently recognized as one of the greatest composers of his age.',
            bio_link: 'https://en.wikipedia.org/wiki/George_Frideric_Handel',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/George_Frideric_Handel_by_Balthasar_Denner.jpg/440px-George_Frideric_Handel_by_Balthasar_Denner.jpg'
        },
        {
            first_name: 'Franz',
            last_name: 'Liszt',
            time_period: romantic[0]._id,
            born: new Date(1811, 10, 22),
            died: new Date(1886, 7, 31),
            nationality: 'Hungary',
            biography: 'Franz Liszt was a Hungarian composer, virtuoso pianist, conductor, and teacher of the Romantic period. With a diverse body of work spanning more than six decades, he is considered to be one of the most prolific and influential composers of his era, and his piano works continue to be widely performed and recorded.',
            bio_link: 'https://en.wikipedia.org/wiki/Franz_Liszt',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Franz_Liszt_1858.jpg/440px-Franz_Liszt_1858.jpg'
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