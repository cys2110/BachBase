const db = require('../db')
const {Time} = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    const times = [
        {
            period: 'Ancient',
            span: '< 0-476',
            description: 'Ancient music refers to the musical cultures and practices that developed in the literate civilizations of the ancient world. Major centers of Ancient music developed in China (the Shang, Zhou, Qin and Han dynasties), Egypt (the Old, Middle and New Kingdoms), Greece (the Archaic, Classical and Hellenistic periods), India (the Maurya, Shunga, Kanva, Kushan, Satavahana and Gupta dynasties), Iran/Persia (the Median, Achaemenid, Seleucid, Parthian and Sasanian Empires), the Maya civilization, Mesopotamia, and Rome (the Roman Republic and Empire). Though extremely diverse, the music of ancient civilizations is frequently characterized by monophony, improvisation and the dominance of text in musical settings.'
        },
        {
            period: 'Medieval',
            span: '476-1400',
            description: 'Medieval music encompasses the sacred and secular music of Western Europe during the Middle Ages, from approximately the 6th to 15th centuries. It is the first and longest major era of Western classical music and followed by the Renaissance music; the two eras comprise what musicologists generally term as early music, preceding the common practice period. Following the traditional division of the Middle Ages, medieval music can be divided into Early (500-1000), High (1000-1300), and Late (1300-1400) medieval music.<br>Medieval music includes liturgical music used for the church, other sacred music, and secular or non-religious music. Much medieval music is purely vocal music, such as Gregorian chant. Other music used only instruments or both voices and instruments (typically with the instruments accompanying the voices).<br>The medieval period saw the creation and adaptation of systems of music notation which enabled creators to document and transmit musical ideas more easily, although notation coexisted with and complemented oral tradition.'
        },
        {
            period: 'Renaissance',
            span: '1400-1600',
            description: 'Renaissance music is traditionally understood to cover European music of the 15th and 16th centuries, later than the Renaissance era as it is understood in other disciplines. Rather than starting from the early 14th-century ars nova, the Trecento music was treated by musicology as a coda to Medieval music and the new era dated from the rise of triadic harmony and the spread of the contenance angloise style from Britain to the Burgundian School. A convenient watershed for its end is the adoption of basso continuo at the beginning of the Baroque period.<br>Music was increasingly freed from medieval constraints, and more variety was permitted in range, rhythm, harmony, form, and notation. On the other hand, rules of counterpoint became more constrained, particularly with regard to treatment of dissonances. In the Renaissance, music became a vehicle for personal expression. Composers found ways to make vocal music more expressive of the texts they were setting. Secular music absorbed techniques from sacred music, and vice versa. Popular secular forms such as the chanson and madrigal spread throughout Europe. Courts employed virtuoso performers, both singers and instrumentalists. Music also became more self-sufficient with its availability in printed form, existing for its own sake.'
        },
        {
            period: 'Baroque',
            span: '1600-1760',
            description: 'Baroque music refers to the period or dominant style of Western classical music composed from about 1600 to 1750. The Baroque style followed the Renaissance period, and was followed in turn by the Classical period after a short transition (the galant style). The Baroque period is divided into three major phases: early, middle, and late. Overlapping in time, they are conventionally dated from 1580 to 1650, from 1630 to 1700, and from 1680 to 1750.<br>The Baroque saw the creation of common-practice tonality, an approach to writing music in which a song or piece is written in a particular key; this type of harmony has continued to be used extensively in Western classical and popular music. During the Baroque era, professional musicians were expected to be accomplished improvisers of both solo melodic lines and accompaniment parts.<br>During the period composers experimented with finding a fuller sound for each instrumental part (thus creating the orchestra), made changes in musical notation (the development of figured bass as a quick way to notate the chord progression of a song or piece), and developed new instrumental playing techniques. Baroque music expanded the size, range, and complexity of instrumental performance, and also established the mixed vocal/instrumental forms of opera, cantata and oratorio and the instrumental forms of the solo concerto and sonata as musical genres. Dense, complex polyphonic music, in which multiple independent melody lines were performed simultaneously (a popular example of this is the fugue), was an important part of many Baroque choral and instrumental works.'
        },
        {
            period: 'Classical',
            span: '1730-1820',
            description: 'The Classical period was an era of classical music between roughly 1750 and 1820. Classical music has a lighter, clearer texture than Baroque music, but a more varying use of musical form, which is, in simpler terms, the rhythm and organization of any given piece of music. It is mainly homophonic, using a clear melody line over a subordinate chordal accompaniment, but counterpoint was by no means forgotten, especially in liturgical vocal music and, later in the period, secular instrumental music. It also makes use of style galant which emphasized light elegance in place of the Baroque\'s dignified seriousness and impressive grandeur. Variety and contrast within a piece became more pronounced than before and the orchestra increased in size, range, and power.<br>Instrumental music was considered important by Classical period composers. The main kinds of instrumental music were the sonata, trio, string quartet, quintet, symphony (performed by an orchestra) and the solo concerto, which featured a virtuoso solo performer playing a solo work for violin, piano, flute, or another instrument, accompanied by an orchestra. Vocal music, such as songs for a singer and piano (notably the work of Schubert), choral works, and opera (a staged dramatic work for singers and orchestra) were also important during this period.'
        },
        {
            period: 'Romantic',
            span: '1815-1910',
            description: 'Romantic music is a stylistic movement in Western Classical music associated with the period of the 19th century commonly referred to as the Romantic era (or Romantic period). It is closely related to the broader concept of Romanticism—the intellectual, artistic and literary movement that became prominent in Western culture from about 1798 until 1837.<br>Romantic composers sought to create music that was individualistic, emotional, dramatic and often programmatic; reflecting broader trends within the movements of Romantic literature, poetry, art, and philosophy. Romantic music was often ostensibly inspired by (or else sought to evoke) non-musical stimuli, such as nature, literature, poetry, super-natural elements or the fine arts. It included features such as increased chromaticism and moved away from traditional forms.'
        },
        {
            period: 'Modernism',
            span: '1900-1945',
            description: 'In music, modernism is an aesthetic stance underlying the period of change and development in musical language that occurred around the turn of the 20th century, a period of diverse reactions in challenging and reinterpreting older categories of music, innovations that led to new ways of organizing and approaching harmonic, melodic, sonic, and rhythmic aspects of music, and changes in aesthetic worldviews in close relation to the larger identifiable period of modernism in the arts of the time. The operative word most associated with it is "innovation". Its leading feature is a "linguistic plurality", which is to say that no one music genre ever assumed a dominant position.'
        },
        {
            period: 'Contemporary',
            span: '1945-present',
            description: 'Contemporary classical music is Western art music composed close to the present day. At the beginning of the 21st century, it commonly referred to the post-1945 modern forms of post-tonal music after the death of Anton Webern, and included serial music, electronic music, experimental music, and minimalist music. Newer forms of music include spectral music, and post-minimalism.'
        }
    ]

    await Time.insertMany(times)
    console.log('inserted')
}

const run = async() => {
    await main()
    db.close()
}

run()