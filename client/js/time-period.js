const headings = document.querySelectorAll('.era')
const spans =document.querySelectorAll('.span')
const summaries = document.querySelectorAll('.summary')
const composers = document.querySelectorAll('.composers')

const details = async() => {
    for (let i=0; i<headings.length; i++) {
        const time = headings[i].id
        const call = await axios.get(`http://localhost:3001/time-periods/${time}`)
        headings[i].innerHTML = call.data[0].period
        spans[i].innerHTML = call.data[0].span
        summaries[i].innerHTML = call.data[0].description
    }
}

details()

const dropdown = document.querySelectorAll('summary')
const icons = document.querySelectorAll('i')

for (let i=0; i<dropdown.length; i++) {
    dropdown[i].addEventListener('click', () => {
        icons[i].classList.toggle('fa-rotate-90')
    })
}

const composerLists = async() => {
    for (let i=0; i<composers.length; i++) {
        const time = headings[i].id
        const call = await axios.get(`http://localhost:3001/composers/time-period/${time}`)
        if (call.data.length > 0) {
            for (let n=-0; n< call.data.length; n++) {
                const composer = composers[i].appendChild(document.createElement('li'))
            const composerLink = composer.appendChild(document.createElement('a'))
            composerLink.href = `../html/composer.html?id=${call.data[n]._id}`
            composerLink.innerHTML = `${call.data[n].first_name} ${call.data[n].last_name}`
            }
        }
    }
}

composerLists()

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