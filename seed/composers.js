const db = require('../db')              
const {Time, Composer} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    const baroque = await Time.find({period: 'Baroque'})
    const romantic = await Time.find({period: 'Romantic'})
    const modernism = await Time.find({period: 'Modernism'})
    const classical = await Time.find({period: 'Classical'})
    const contemporary = await Time.find({period: 'Contemporary'})

    const composers = [
        {
            first_name: 'Paul',
            last_name: 'Hindemith',
            time_period: modernism[0]._id,
            born: new Date(1895, 11, 16),
            died: new Date(1963, 12, 28),
            nationality: ['German'],
            biography: 'Paul Hindemith was a German and American composer, music theorist, teacher, violist and conductor. He founded the Amar Quartet in 1921, touring extensively in Europe. As a composer, he became a major advocate of the Neue Sachlichkeit (New Objectivity) style of music in the 1920s, with compositions such as Kammermusik, including works with viola and viola d\'amore as solo instruments in a neo-Bachian spirit. Other notable compositions include his song cycle Das Marienleben (1923), Der Schwanendreher for viola and orchestra (1935), the opera Mathis der Maler (1938), the Symphonic Metamorphosis of Themes by Carl Maria von Weber (1943), and the oratorio When Lilacs Last in the Dooryard Bloom\'d (1946), a requiem based on Walt Whitman\'s poem. Hindemith and his wife emigrated to Switzerland and the United States ahead of World War II, after worsening difficulties with the Nazi German regime. In his later years, he conducted and recorded much of his own music.',
            bio_link: 'https://en.wikipedia.org/wiki/Paul_Hindemith',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Paul_Hindemith_1923.jpg/220px-Paul_Hindemith_1923.jpg'
        },
        {
            first_name: 'Tomaso',
            last_name: 'Albinoni',
            time_period: baroque[0]._id,
            born: new Date(1671, 6, 8),
            died: new Date(1751, 1, 17),
            nationality: ['Italian'],
            biography: 'Tomaso Giovanni Albinoni was an Italian composer of the Baroque era. His output includes operas, concertos, sonatas for one to six instruments, sinfonias, and solo cantatas. While famous in his day as an opera composer, he is known today for his instrumental music, especially his concertos. He is best remembered today for a work called "Adagio in G minor", attributed to him but largely written by Remo Giazotto, a 20th century musicologist and composer, who was a cataloger of the works of Albinoni.',
            bio_link: 'https://en.wikipedia.org/wiki/Tomaso_Albinoni',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Albinoni.jpg/220px-Albinoni.jpg'
        },
        {
            first_name: 'Girolamo',
            last_name: 'Frescobaldi',
            time_period: baroque[0]._id,
            born: new Date(1583, 9, 15),
            died: new Date(1643, 3, 1),
            nationality: ['Italian'],
            biography: 'Girolamo Alessandro Frescobaldi was an Italian composer and virtuoso keyboard player. Born in the Duchy of Ferrara, he was one of the most important composers of keyboard music in the late Renaissance and early Baroque periods. A child prodigy, Frescobaldi studied under Luzzasco Luzzaschi in Ferrara, but was influenced by many composers, including Ascanio Mayone, Giovanni Maria Trabaci, and Claudio Merulo. Girolamo Frescobaldi was appointed organist of St. Peter\'s Basilica, a focal point of power for the Cappella Giulia (a musical organisation), from 21 July 1608 until 1628 and again from 1634 until his death.',
            bio_link: 'https://en.wikipedia.org/wiki/Girolamo_Frescobaldi',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Girolamo_Frescobaldi_%281583-1643%29%2C_engraving_by_Claude_Mellan_%281619%29.jpg/220px-Girolamo_Frescobaldi_%281583-1643%29%2C_engraving_by_Claude_Mellan_%281619%29.jpg'
        },
        {
            first_name: 'Cécile',
            last_name: 'Chaminade',
            time_period: romantic[0]._id,
            born: new Date(1857, 8, 8),
            died: new Date(1944, 4, 13),
            nationality: ['French'],
            biography: 'Cécile Louise Stéphanie Chaminade was a French composer and pianist. In 1913, she was awarded the Légion d\'Honneur, a first for a female composer. Ambroise Thomas said, "This is not a woman who composes, but a composer who is a woman."',
            bio_link: 'https://en.wikipedia.org/wiki/C%C3%A9cile_Chaminade',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cecile_chaminade.jpg/220px-Cecile_chaminade.jpg'
        },
        {
            first_name: 'Heitor',
            last_name: 'Villa-Lobos',
            time_period: modernism[0]._id,
            born: new Date(1887, 3, 8),
            died: new Date(1959, 11, 17),
            nationality: ['Brazilian'],
            biography: 'Heitor Villa-Lobos was a Brazilian composer, conductor, cellist, and classical guitarist described as "the single most significant creative figure in 20th-century Brazilian art music". Villa-Lobos has become the best-known South American composer of all time. A prolific composer, he wrote numerous orchestral, chamber, instrumental and vocal works, totaling over 2,000 works by his death in 1959. His music was influenced by both Brazilian folk music and stylistic elements from the European classical tradition, as exemplified by his Bachianas Brasileiras (Brazilian Bachian-pieces) and his Chôros. His Etudes for classical guitar (1929) were dedicated to Andrés Segovia, while his 5 Preludes (1940) were dedicated to his spouse Arminda Neves d\'Almeida, a.k.a. "Mindinha". Both are important works in the classical guitar repertory.',
            bio_link: 'https://en.wikipedia.org/wiki/Heitor_Villa-Lobos',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Heitor_Vila-Lobos_%28c._1922%29part.jpg'
        },
        {
            first_name: 'César',
            last_name: 'Franck',
            time_period: romantic[0]._id,
            born: new Date(1822, 12, 10),
            died: new Date(1890, 11, 8),
            nationality: ['French', 'Belgian'],
            biography: 'César-Auguste-Jean-Guillaume-Hubert Franck was a French Romantic composer, pianist, organist, and music teacher born in present-day Belgium.',
            bio_link: 'https://en.wikipedia.org/wiki/C%C3%A9sar_Franck',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/C%C3%A9sar_Franck_by_Pierre_Petit.jpg/220px-C%C3%A9sar_Franck_by_Pierre_Petit.jpg'
        },
        {
            first_name: 'Jean-Philippe',
            last_name: 'Rameau',
            time_period: baroque[0]._id,
            born: new Date(1683, 9, 25),
            died: new Date(1764, 9, 12),
            nationality: ['French'],
            biography: 'Jean-Philippe Rameau was a French composer and music theorist. Regarded as one of the most important French composers and music theorists of the 18th century, he replaced Jean-Baptiste Lully as the dominant composer of French opera and is also considered the leading French composer of his time for the harpsichord, alongside François Couperin.',
            bio_link: 'https://en.wikipedia.org/wiki/Jean-Philippe_Rameau',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Attribu%C3%A9_%C3%A0_Joseph_Aved%2C_Portrait_de_Jean-Philippe_Rameau_%28vers_1728%29_-_001.jpg/250px-Attribu%C3%A9_%C3%A0_Joseph_Aved%2C_Portrait_de_Jean-Philippe_Rameau_%28vers_1728%29_-_001.jpg'
        },
        {
            first_name: 'Dietrich',
            last_name: 'Buxtehude',
            time_period: baroque[0]._id,
            born: 'ca. 1637',
            died: new Date(1707, 5, 9),
            nationality: ['German', 'Danish'],
            biography: 'Dieterich Buxtehude  was a Danish organist and composer of the Baroque period, whose works are typical of the North German organ school. As a composer who worked in various vocal and instrumental idioms, Buxtehude\'s style greatly influenced other composers, such as Johann Sebastian Bach and George Frideric Handel. Buxtehude is considered one of the most important composers of the 17th century.',
            bio_link: 'https://en.wikipedia.org/wiki/Dietrich_Buxtehude',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Dieterich_Buxtehude.png/220px-Dieterich_Buxtehude.png'
        },
        {
            first_name: 'Fritz',
            last_name: 'Kreisler',
            time_period: modernism[0]._id,
            born: new Date(1875, 2, 2),
            died: new Date(1962, 1, 29),
            nationality: ['Austrian', 'American'],
            biography: 'Friedrich "Fritz" Kreisler was an Austrian-born American violinist and composer. One of the most noted violin masters of his day, and regarded as one of the greatest violinists of all time, he was known for his sweet tone and expressive phrasing. Like many great violinists of his generation, he produced a characteristic sound which was immediately recognizable as his own. Although it derived in many respects from the Franco-Belgian school, his style is nonetheless reminiscent of the gemütlich (cozy) lifestyle of pre-war Vienna.',
            bio_link: 'https://en.wikipedia.org/wiki/Fritz_Kreisler',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Fritz_Kreisler_1.jpg/220px-Fritz_Kreisler_1.jpg'
        },
        {
            first_name: 'Florence',
            last_name: 'Price',
            time_period: modernism[0]._id,
            born: new Date(1887, 4, 9),
            died: new Date(1953, 6, 3),
            nationality: ['American'],
            biography: 'Florence Beatrice Price was an American classical composer, pianist, organist and music teacher. Born in Little Rock, Arkansas, Price was educated at the New England Conservatory of Music, and was active in Chicago from 1927 until her death in 1953. Price is noted as the first African-American woman to be recognized as a symphonic composer, and the first to have a composition played by a major orchestra. Price composed over 300 works: four symphonies, four concertos, as well as choral works, art songs, chamber music and music for solo instruments. In 2009, a substantial collection of her works and papers was found in her abandoned summer home.',
            bio_link: 'https://en.wikipedia.org/wiki/Florence_Price',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Composer_Florence_Price_%28cropped%29.jpg/220px-Composer_Florence_Price_%28cropped%29.jpg'
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