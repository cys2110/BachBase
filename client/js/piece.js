// Query string

// code adapted from ChatGPT

let params = {}
let id
const parseQueryString = () => {
    const queryString = window.location.search.substring(1)
    const pair = queryString.split('=')
    id = decodeURIComponent(pair[1])
}

parseQueryString()

// populate page

const title = document.querySelector('#title')
const page = document.querySelector('#page')
const composer = document.querySelector('#composer')
const detail = document.querySelector('#details')
const music = document.querySelector('#music')
const performance = document.querySelector('#performance')
const performer = document.querySelector('#performer')
const aboutSection = document.querySelector('#about-section')
    aboutSection.style.display = 'none'
const aboutDl = document.querySelector('#about-dl')
    aboutDl.style.display = 'none'
const structure = document.querySelector('#structure')
    structure.style.display = 'none'

const details = async() => {
    const call = await axios.get(`http://localhost:3001/pieces/id/${id}`)
    const response = call.data
    title.innerHTML = `BachBase | ${response.piece}`
    page.innerHTML = response.piece
    const composerLink = composer.appendChild(document.createElement('a'))
    composerLink.href = `../html/composer.html?id=${response.composer._id}`
    composerLink.innerHTML = `${response.composer.first_name} ${response.composer.last_name}`
    
    if (response.performance) {
        performance.src = response.performance.link
        performer.innerHTML = `<strong>Performers:</strong> ${response.performance.performer}`
    } else {
        performance.style.display = 'none'
    }
    if (response.opus) {
        const opusHeading = detail.appendChild(document.createElement('dt'))
        opusHeading.innerHTML = 'Catalogue No.'
        const opus = detail.appendChild(document.createElement('dd'))
        opus.innerHTML = response.opus
    }
    if (response.alias) {
        const aliasHeading = detail.appendChild(document.createElement('dt'))
        aliasHeading.innerHTML = 'Alternate Name'
        const alias = detail.appendChild(document.createElement('dd'))
        alias.innerHTML = response.alias
    }
    if (response.year) {
        const yearHeading = detail.appendChild(document.createElement('dt'))
        yearHeading.innerHTML = 'Year Composed'
        const year = detail.appendChild(document.createElement('dd'))
        year.innerHTML = response.year
    }
    if (response.publication) {
        const pubHeading = detail.appendChild(document.createElement('dt'))
        pubHeading.innerHTML = 'Year Published'
        const pub = detail.appendChild(document.createElement('dd'))
        pub.innerHTML = response.publication
    }
    if (response.genre) {
        const genreHeading = detail.appendChild(document.createElement('dt'))
        genreHeading.innerHTML = 'Genre'
        for (let i=0; i < response.genre.length; i++) {
            const genre = detail.appendChild(document.createElement('dd'))
            genre.innerHTML = response.genre[i]
        }
    }
    if (response.style) {
        const styleHeading = detail.appendChild(document.createElement('dt'))
        styleHeading.innerHTML = 'Style'
        const style = detail.appendChild(document.createElement('dd'))
        style.innerHTML = response.style
    }
    if (response.key) {
        const keyHeading = detail.appendChild(document.createElement('dt'))
        keyHeading.innerHTML = 'Key'
        const key = detail.appendChild(document.createElement('dd'))
        key.innerHTML = response.key
    }
    if (response.tempo) {
        const tempoHeading = detail.appendChild(document.createElement('dt'))
        tempoHeading.innerHTML = 'Tempo'
        const tempo = detail.appendChild(document.createElement('dd'))
        tempo.innerHTML = response.tempo
    }
    const instrumentationHeading = detail.appendChild(document.createElement('dt'))
    instrumentationHeading.innerHTML = 'Instrumentation'
    for (let i=0; i<response.instrumentation.length; i++) {
        const instrumentation = detail.appendChild(document.createElement('dd'))
        instrumentation.innerHTML = response.instrumentation[i].instrument
    }
    if (response.dedicatee) {
        const dedHeading = detail.appendChild(document.createElement('dt'))
        dedHeading.innerHTML = 'Dedicatee'
        const ded = detail.appendChild(document.createElement('dd'))
        ded.innerHTML = response.dedicatee
    }
    if (response.movements.length > 0) {
        structure.style.display = ''
        const movementsDl = document.createElement('dl')
        structure.after(movementsDl)
        for (let i=0; i < response.movements.length; i++) {
            const movement = movementsDl.appendChild(document.createElement('dt'))
            movement.style.fontWeight = 'normal'
            movement.style.fontStyle = 'normal'
            if (response.movements[i].movement_name && response.movements[i].tempo && response.movements[i].key) {
                movement.innerHTML = `${i+1}. ${response.movements[i].movement_name}. ${response.movements[i].tempo} (${response.movements[i].key})`
            } else if (response.movements[i].movement_name && response.movements[i].tempo) {
                movement.innerHTML = `${i+1}. ${response.movements[i].movement_name}. ${response.movements[i].tempo}`
            } else if (response.movements[i].movement_name && response.movements[i].key) {
                movement.innerHTML = `${i+1}. ${response.movements[i].movement_name} (${response.movements[i].key})`
            } else if (response.movements[i].tempo && response.movements[i].key) {
                movement.innerHTML = `${i+1}. ${response.movements[i].tempo} (${response.movements[i].key})`
            } else if (response.movements[i].movement_name) {
                movement.innerHTML = `${i+1}. ${response.movements[i].movement_name}`
            } else if (response.movements[i].tempo) {
                movement.innerHTML = `${i+1}. ${response.movements[i].tempo}`
            }
            if (response.movements[i].analysis) {
                const movementAnalysis = document.createElement('dd')
                movementAnalysis.innerHTML = response.movements[i].analysis
                movement.after(movementAnalysis)
                movement.style.fontStyle = 'italic'
            }
        }
    }
    if (response.about) {
        aboutSection.style.display = ''
        aboutDl.style.display = ''
        if (response.about.background) {
            const aboutHeading = aboutDl.appendChild(document.createElement('dt'))
            aboutHeading.innerHTML = 'Background'
            const about = aboutDl.appendChild(document.createElement('dd'))
            about.innerHTML = response.about.background
        }
        if (response.about.analysis) {
            const aboutHeading = aboutDl.appendChild(document.createElement('dt'))
            aboutHeading.innerHTML = 'Analysis'
            const about = aboutDl.appendChild(document.createElement('dd'))
            about.innerHTML = response.about.analysis
        }
        if (response.about.reception) {
            const aboutHeading = aboutDl.appendChild(document.createElement('dt'))
            aboutHeading.innerHTML = 'Reception'
            const about = aboutDl.appendChild(document.createElement('dd'))
            about.innerHTML = response.about.reception
        }
        if (response.about.culture) {
            const aboutHeading = aboutDl.appendChild(document.createElement('dt'))
            aboutHeading.innerHTML = 'Cultural legacy'
            const about = aboutDl.appendChild(document.createElement('dd'))
            about.innerHTML = response.about.culture
        }
        if (response.about.wiki) {
            const wikiLink = document.createElement('a')
            wikiLink.href = response.about.wiki
            wikiLink.innerHTML = 'Read more'
            wikiLink.setAttribute('class', 'wiki')
            aboutDl.after(wikiLink)
        }
    }
    music.href = response.sheet_music
}

details()

// edit form
const checkboxes = document.querySelectorAll('.checkbox')
let instrumentation = []
const piece = document.querySelector('#piece')
const alias = document.querySelector('#alias')
const opusForm = document.querySelector('#opus')
const year = document.querySelector('#year')
const key = document.querySelector('#key')
const genreForm = document.querySelectorAll('.genre')
let genre = []
const fName = document.querySelector('#fname')
const lName = document.querySelector('#lname')
const performanceLink = document.querySelector('#performanceForm')
const performerForm = document.querySelector('#performerForm')
const sheetMusic = document.querySelector('#sheet-music')
const styleForm = document.querySelector('#style')
const editButton = document.querySelector('#edit-piece')
editButton.value = id
const background = document.querySelector('#background')
const analysis = document.querySelector('#analysis')
const culture = document.querySelector('#culture')
const reception = document.querySelector('#reception')
const wiki = document.querySelector('#wiki')
const addMovement = document.querySelector('#add-movement')
const movement = document.querySelector('#movement1')
const movementsFieldset = document.querySelector('#movements')
const dedicatee = document.querySelector('#dedicatee')
const publication = document.querySelector('#publication')
const tempo = document.querySelector('#tempo')

const filterObject = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([_, value]) => {
        if (
            value == null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'object' && Object.keys(value).length === 0)
        ) {
            return false;
        }
        return true;
    }))
}

// // add movement fieldset on form
addMovement.addEventListener('click', () => {
    const movements = document.querySelectorAll('.movement')
    const additional = movement.cloneNode(true)
    const nextId = movements.length + 1
    additional.id = `movement${nextId}`
    additional.querySelector('legend').innerHTML = `Movement/Section ${nextId}`
    movementsFieldset.appendChild(additional)
})

// selected instrumentation checkboxes
const getInstrumentation = () => {
    instrumentation = []
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            instrumentation.push(checkbox.value)
        }
    })
}

// selected genre checkboxes
const getGenre = () => {
    genre = []
    genreForm.forEach(checkbox => {
        if (checkbox.checked) {
            genre.push(checkbox.value)
        }
    })
}

// edit event listener
editButton.addEventListener('click', () => {
    getInstrumentation()
    getGenre()
    
    const index=styleForm.selectedIndex
    const style = styleForm.options[index].value

    let filteredPerformance

    const performanceObject = {
            link: performanceLink.value,
            performer: performerForm.value
        }
    filteredPerformance = filterObject(performanceObject)
    
    let unicodeKey
    if (key.value) {
        unicodeKey = key.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>')
    }

    const movements = document.querySelectorAll('.movement')
    let movementsArray = []
    for (let i=0; i<movements.length; i++) {
        const movementValues = {
            movement_name: movements[i].querySelector('#name').value,
            tempo: movements[i].querySelector('#movement-tempo').value,
            key: movements[i].querySelector('#movement-key').value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
            analysis: movements[i].querySelector('#movement-analysis').value,
            wiki: wiki.value
        }
        const filteredMovements = filterObject(movementValues)
        movementsArray = [...movementsArray, filteredMovements]
    }
    if (movementsArray.length === 1 && Object.keys(movementsArray[0]).length === 0) {
        movementsArray = '';
    }

    backgroundValue = background.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
    analysisValue = analysis.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
    cultureValue = culture.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
    receptionValue = reception.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>')

    const data = {
        piece: piece.value,
        alias: alias.value,
        opus: opusForm.value,
        year: year.value,
        key: unicodeKey,
        background: backgroundValue,
        analysis: analysisValue,
        culture: cultureValue,
        reception: receptionValue,
        wiki: wiki.value,
        movements: movementsArray,
        genre: genre,
        style: style,
        first: fName.value,
        last: lName.value,
        performance: filteredPerformance,
        instrumentation: instrumentation,
        sheet_music: sheetMusic.value,
        dedicatee: dedicatee.value,
        publication: publication.value,
        tempo: tempo.value
    }
    const filteredData = filterObject(data)

    axios.patch(`http://localhost:3001/pieces/id/${id}`, filteredData)
    .then(response => {
        location.reload()
        console.log('Response:', response.data)
    })
    .catch(error => {
        console.log('Error:', error)
    })
})

// search dropdown function adapted from ChatGPT
const search = document.querySelector('#search-bar')
const delay = 2000
const dropdownContent = document.querySelector('#dropdown-content')

const searchResults = async() => {
    const input = search.value
    const data = await axios.get(`http://localhost:3001/search/${input}`)
    const results = data.data
    if (input.length === 0) {
        return dropdownContent.style.display = 'none'
    }
    removeChildNodes(dropdownContent)
    if (results.composers.length > 0) {
        const composerHeading = dropdownContent.appendChild(document.createElement('p'))
        composerHeading.innerHTML = '<strong>Composers</strong>'
        for (let i=0; i < 5; i++) {
            if (results.composers[i]) {
                const composer = document.createElement('a')
                composer.innerHTML = `${results.composers[i].first_name} ${results.composers[i].last_name}`
                composer.href = `../html/composer.html?id=${results.composers[i]._id}`
                dropdownContent.appendChild(composer)
            }
        }
    }
    if (results.pieces.length > 0) {
        const piecesHeading = dropdownContent.appendChild(document.createElement('p'))
        piecesHeading.innerHTML = '<strong>Pieces</strong>'
        for (let i=0; i < 5; i++ ) {
            if (results.pieces[i]) {
                const piece = document.createElement('a')
                piece.innerHTML = results.pieces[i].piece
                piece.href = `../html/piece.html?id=${results.pieces[i]._id}`
                dropdownContent.appendChild(piece)
            }
        }
    }
    dropdownContent.style.display = 'block'
}

const removeChildNodes = (details) => {
    while (details.childNodes.length > 0 && details.lastChild !== search) {
        details.removeChild(details.lastChild);
    }
}

search.addEventListener('input', () => {
    setTimeout(() => {
        searchResults()
    }, delay)
})

const searchInstruments = document.getElementById('instrument-search')
const instruments = document.querySelectorAll('#instrumentation input[type="checkbox"]')

searchInstruments.addEventListener('input', function() {
    const search = searchInstruments.value.trim().toLowerCase();
    instruments.forEach((checkbox) => {
        const label = checkbox.parentElement.textContent.toLowerCase();
        if (search === '' || label.includes(search)) {
            checkbox.parentElement.style.display = 'block';
        } else {
            checkbox.parentElement.style.display = 'none'
        }
    })
})

// genre checkbox search
const searchGenres = document.getElementById('genre-search')
const genres = document.querySelectorAll('#genre-fieldset input[type="checkbox"]')

searchGenres.addEventListener('input', function() {
    const search = searchGenres.value.trim().toLowerCase();
    genres.forEach((checkbox) => {
        const label = checkbox.parentElement.textContent.toLowerCase();
        if (search === '' || label.includes(search)) {
            checkbox.parentElement.style.display = 'block';
        } else {
            checkbox.parentElement.style.display = 'none'
        }
    })
})