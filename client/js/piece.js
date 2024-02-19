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
const opus = document.querySelector('#opus')
const detail = document.querySelector('#details')
const music = document.querySelector('#music')
const performance = document.querySelector('#performance')
const performer = document.querySelector('#performer')

const details = async() => {
    const call = await axios.get(`http://localhost:3001/pieces/id/${id}`)
    const response = call.data
    title.innerHTML = `BachBase | ${response.piece}`
    page.innerHTML = response.piece
    composer.innerHTML = `${response.composer.first_name} ${response.composer.last_name}`
    if (response.opus) {
        opus.innerHTML = response.opus
    }
    if (response.performance) {
        performance.src = response.performance.link
        performer.innerHTML = `<strong>Performers</strong> ${response.performance.performer}`
    } else {
        performance.style.display = 'none'
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
    const instrumentationHeading = detail.appendChild(document.createElement('dt'))
    instrumentationHeading.innerHTML = 'Instrumentation'
    for (let i=0; i<response.instrumentation.length; i++) {
        const instrumentation = detail.appendChild(document.createElement('dd'))
        instrumentation.innerHTML = response.instrumentation[i].instrument
    }
    music.href = response.sheet_music
}

details()

// add/edit form
const addPiece = document.querySelector('#add')
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
const performanceLink = document.querySelector('#performance')
const performerForm = document.querySelector('#performer')
const sheetMusic = document.querySelector('#sheet-music')
const styleForm = document.querySelector('#style')
let style
const editButton = document.querySelector('#edit')
editButton.value = id

styleForm.addEventListener('change', () => {
    const index = styleForm.selectedIndex
    style = styleForm.options[index].value
})

const getInstrumentation = () => {
    instrumentation = []
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            instrumentation.push(checkbox.value)
        }
    })
}

const getGenre = () => {
    genre = []
    genreForm.forEach(checkbox => {
        if (checkbox.checked) {
            genre.push(checkbox.value)
        }
    })
}

addPiece.addEventListener('click', () => {
    getInstrumentation()
    getGenre()
    const performance = {
        link: performanceLink.value,
        performer: performerForm.value
    }
    const unicodeKey = key.value.replace('-flat', '<sup>&#9837</sup>').replace('-sharp', '<sup>U+266F</sup>')
    const filteredPerformance = Object.fromEntries(Object.entries(performance).filter(([_, value]) => value !== null && value !== ""))
    const data = {
        piece: piece.value,
        alias: alias.value,
        opus: opusForm.value,
        year: year.value,
        key: unicodeKey,
        genre: genre,
        style: style,
        first: fName.value,
        last: lName.value,
        performance: filteredPerformance,
        instrumentation: instrumentation,
        sheet_music: sheetMusic.value,
    }
    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null && value !== ""))
    axios.post('http://localhost:3001/pieces', filteredData)
    .then(response => {
        console.log('Response:', response.data)
    })
    .catch(error => {
        console.log('Error:', error)
    })
    location.reload()
})

editButton.addEventListener('click', () => {
    getInstrumentation()
    getGenre()
    let performanceObject
    if (performanceLink.value !== "") {
        performanceObject = {
            link: performanceLink.value,
            performer: performerForm.value
        }
    }
    const filteredPerformance = Object.fromEntries(Object.entries(performanceObject).filter(([_, value]) => value !== null && value !== "" && value !== undefined))
    let unicodeKey
    if (key.value) {
        unicodeKey = key.value.replace('-flat', '<sup>&#9837</sup>').replace('-sharp', '<sup>&#9839</sup>')
    }
    const data = {
        piece: piece.value,
        alias: alias.value,
        opus: opusForm.value,
        year: year.value,
        key: unicodeKey,
        genre: genre,
        style: style,
        first: fName.value,
        last: lName.value,
        performance: filteredPerformance,
        instrumentation: instrumentation,
        sheet_music: sheetMusic.value,
    }

    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null && value !== "" && value !== undefined && !(Array.isArray(value) && value.length === 0) && !(typeof value === 'object' && Object.keys(value).length === 0)))

    axios.patch(`http://localhost:3001/pieces/id/${id}`, filteredData)
    .then(response => {
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
    while (details.firstChild) {
      details.removeChild(details.firstChild)
    }
}

search.addEventListener('keydown', () => {
    setTimeout(() => {
        searchResults()
    }, delay)
})