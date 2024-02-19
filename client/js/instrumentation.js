const types = document.querySelectorAll('.types')
const instruments = document.querySelectorAll('.instruments')
const pieces = document.querySelectorAll('.pieces')

const details = async() => {
    for (let i=0; i<types.length; i++) {
        const type = types[i].id
        const call = await axios.get(`http://localhost:3001/instrumentation/${type}`)
        types[i].innerHTML = call.data[0].type
        for (let n=0; n<call.data.length; n++) {
            const dropdown = document.createElement('details')
            const instrument = dropdown.appendChild(document.createElement('summary'))
            instrument.innerHTML = call.data[n].instrument
            types[i].after(dropdown)

            const piecesCall = await axios.get(`http://localhost:3001/pieces/instrument/${call.data[n].instrument}`)
            const instrumentList = document.createElement('ul')
            for (let j=0; j<piecesCall.data.length; j++) {
                const pieces = instrumentList.appendChild(document.createElement('li'))
                pieces.innerHTML = piecesCall.data[j].piece
            }
            instrument.after(instrumentList)
        }
    }
}

details()

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