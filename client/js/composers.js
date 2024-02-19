const composers = document.querySelectorAll('.composers')
const headings = document.querySelectorAll('.headings')

const details = async() => {
    for (let i=0; i<composers.length; i++) {
        const input = headings[i].id
        const call = await axios.get(`http://localhost:3001/composers/letter/${input}`)
        const response = call.data
        if (response) {
            for (let n=0; n<response.length; n++) {
                const composer = composers[i].appendChild(document.createElement('li'))
                const composerLink = composer.appendChild(document.createElement('a'))
                composerLink.innerHTML = `${response[n].first_name} ${response[n].last_name}`
                composerLink.href = `../html/composer.html?id=${response[n]._id}`
            }
        }
    }
}

details()

const time = document.querySelector('#time')
let selectedTime = ''
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const addComposer = document.querySelector('#add-composer')
const born = document.querySelector('#born')
const died = document.querySelector('#died')
const nationality = document.querySelector('#nationality')
const bio = document.querySelector('#biography')
const link = document.querySelector('#bio-link')
const picture = document.querySelector('#picture')

time.addEventListener('change', () => {
    const index = time.selectedIndex
    selectedTime = time.options[index].value
})

addComposer.addEventListener('click', () => {
    const data = {
        first_name: firstName.value,
        last_name: lastName.value,
        time_period: selectedTime,
        born: born.value,
        died: died.value,
        nationality: nationality.value,
        bio: bio.value,
        link: link.value,
        picture: picture.value
    }
    let filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null && value !== ""))
    if (firstName.value === '') {
        filteredData.first_name = ''
    }
    axios.post('http://localhost:3001/composers', filteredData)
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