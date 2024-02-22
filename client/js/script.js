// Global functions

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

// add composer
// // Global variables
const time = document.querySelector('#time')
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const addComposer = document.querySelector('#add-composer')
const born = document.querySelector('#born')
const died = document.querySelector('#died')
const nationality = document.querySelector('#nationality')
const bio = document.querySelector('#biography')
const link = document.querySelector('#bio-link')
const picture = document.querySelector('#picture')

// // Event listener
addComposer.addEventListener('click', () => {
    const index = time.selectedIndex
    const selectedTime = time.options[index].value
    const nationalityArray = nationality.value.split(', ')
    const data = {
        first_name: firstName.value,
        last_name: lastName.value,
        time_period: selectedTime,
        born: born.value,
        died: died.value,
        nationality: nationalityArray,
        bio: bio.value,
        link: link.value,
        picture: picture.value
    }
    let filteredData = filterObject(data)
    if (firstName.value === '') {
        filteredData.first_name = ''
    }

    axios.post('http://localhost:3001/composers', filteredData)
    .then(response => {
        location.reload()
        console.log('Response:', response.data)
    })
    .catch(error => {
        console.log('Error:', error)
    })
})

// add piece
// // global variables
const addPiece = document.querySelector('#add-piece')
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
const composerForm = document.querySelector('#composer-form')
const pieceForm = document.querySelector('#piece-form')
const background = document.querySelector('#background')
const analysis = document.querySelector('#analysis')
const culture = document.querySelector('#culture')
const reception = document.querySelector('#reception')
const wikiLink = document.querySelector('#wiki')
const addMovement = document.querySelector('#add-movement')
const movement = document.querySelector('#movement1')
const movementsFieldset = document.querySelector('#movements')
const dedicatee = document.querySelector('#dedicatee')
const publication = document.querySelector('#publication')
const tempo = document.querySelector('#tempo')

// // add movement fieldset on form
addMovement.addEventListener('click', () => {
    const movements = document.querySelectorAll('.movement')
    const additional = movement.cloneNode(true)
    const nextId = movements.length + 1
    additional.id = `movement${nextId}`
    additional.querySelector('legend').innerHTML = `Movement/Section ${nextId}`
    movementsFieldset.appendChild(additional)
})

// instrument checkbox search - adapted from ChatGPT
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

// // select instrumentation checked boxes
const getInstrumentation = () => {
    instrumentation = []
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            instrumentation.push(checkbox.value)
        }
    })
}

// // select genre checked boxes
const getGenre = () => {
    genre = []
    genreForm.forEach(checkbox => {
        if (checkbox.checked) {
            genre.push(checkbox.value)
        }
    })
}

// // add piece event listener
addPiece.addEventListener('click', () => {
    getInstrumentation()
    getGenre()

    const index=styleForm.selectedIndex
    const style = styleForm.options[index].value
    const performance = {
        link: performanceLink.value,
        performer: performerForm.value
    }
    const filteredPerformance = filterObject(performance)

    const movements = document.querySelectorAll('.movement')
    let movementsArray = []
    for (let i=0; i<movements.length; i++) {
        const movementValues = {
            movement_name: movements[i].querySelector('#name').value,
            tempo: movements[i].querySelector('#tempo').value,
            key: movements[i].querySelector('#key').value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
            analysis: movements[i].querySelector('#movement-analysis').value
        }
        const filteredMovements = filterObject(movementValues)
        movementsArray = [...movementsArray, filteredMovements]
    }
    movementsArray = filterObject(movementsArray)

    const unicodeKey = key.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>')

    const aboutValues = {
        background: background.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
        analysis: analysis.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
        culture: culture.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
        reception: reception.value.replaceAll('-flat', '<sup>&#9837;</sup>').replaceAll('-sharp', '<sup>&#9839;</sup>'),
        wiki: wikiLink.value
    }
    const about = filterObject(aboutValues)

    const data = {
        piece: piece.value,
        alias: alias.value,
        opus: opusForm.value,
        year: year.value,
        key: unicodeKey,
        about: about,
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

    axios.post('http://localhost:3001/pieces', filteredData)
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
