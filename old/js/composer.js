let params = {}
let id

const parseQueryString = () => {
    const queryString = window.location.search.substring(1)
    const pair = queryString.split('=')
    id = decodeURIComponent(pair[1])
}

parseQueryString()

// taken from ChatGPT
const isValidDate = (dateString) => {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
}

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-GB', options)
}


const title = document.querySelector('#title')
const page = document.querySelector('#page')
const dates = document.querySelector('#dates')
const picture = document.querySelector('#picture')
const detail = document.querySelector('#details')
const pieces = document.querySelector('#pieces')

const details = async() => {
    const call = await axios.get(`http://localhost:3001/composers/id/${id}`)
    const response = call.data
    title.innerHTML = `BachBase | ${response.first_name} ${response.last_name}`
    page.innerHTML = `${response.first_name} ${response.last_name}`
    if (response.born && response.died) {
        if (isValidDate(response.born) && isValidDate(response.died)) {
            const born = formatDate(response.born)
            const death = formatDate(response.died)
            dates.innerHTML = `${born} - ${death}`
        } else if (isValidDate(response.born)) {
            const born = formatDate(response.born)
            dates.innerHTML = `${born} - ${response.died}`
        } else if (isValidDate(response.died)) {
            const death = formatDate(response.died)
            dates.innerHTML = `${response.born} - ${death}`
        } else {
            dates.innerHTML = `${response.born} - ${response.died}`
        }
    } else if (response.born) {
        if (isValidDate(response.born)) {
            const born = formatDate(response.born)
            dates.innerHTML = `b. ${born}`
        } else {
            dates.innerHTML = `b. ${response.born}`
        }
    } else if (response.died) {
        if (isValidDate(response.died)) {
            const death = formatDate(response.died)
            dates.innerHTML = `d. ${death}`
        } else {
            dates.innerHTML = `d. ${response.died}`
        }
    }
    if (response.picture) {
        picture.src = response.picture
    }
    const timeHeading = detail.appendChild(document.createElement('dt'))
    timeHeading.innerHTML = 'Time period'
    const time = detail.appendChild(document.createElement('dd'))
    time.innerHTML = response.time_period.period
    if (response.nationality.length > 0) {
        const nationalityHeading = detail.appendChild(document.createElement('dt'))
            nationalityHeading.innerHTML = 'Nationality'
        for (let i=0; i < response.nationality.length; i++) {
            const nationality = detail.appendChild(document.createElement('dd'))
            nationality.innerHTML = response.nationality[i]
        }
    }
    if (response.biography) {
        const bioHeading = detail.appendChild(document.createElement('dt'))
        bioHeading.innerHTML = 'Biography'
        const bio = detail.appendChild(document.createElement('dd'))
        bio.innerHTML = `${response.biography}<br><a href="${response.bio_link}" target="_blank" class="wiki">Read more</a>`
    }
    const piecesCall = await axios.get(`http://localhost:3001/pieces/composer/${id}`)
    const piecesResponse = piecesCall.data
    for (let i=0; i < piecesResponse.length; i++) {
        const piece = pieces.appendChild(document.createElement('dd'))
        piece.innerHTML = `<a href="../html/piece.html?id=${piecesResponse[i]._id}">${piecesResponse[i].piece}</a>`
    }
}

const time = document.querySelector('#time')
let selectedTime = ''
const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const editButton = document.querySelector('#edit')
const born = document.querySelector('#born')
const died = document.querySelector('#died')
const nationality = document.querySelector('#nationality')
const bio = document.querySelector('#biography')
const link = document.querySelector('#bio-link')
const pictureLink = document.querySelector('#picture')

editButton.value = id

time.addEventListener('change', () => {
    const index = time.selectedIndex
    selectedTime = time.options[index].value
})

editButton.addEventListener('click', () => {
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
        picture: pictureLink.value
    }

    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null && value !== "" && value !== undefined))
    axios.patch(`http://localhost:3001/composers/id/${id}`, filteredData)
    .then(response => {
        console.log('Response:', response.data)
    })
    .catch(error => {
        console.log('Error:', error)
    })
})

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
                piece.innerHTML = `${results.pieces[i].piece} (<em>${results.pieces[i].composer.first_name} ${results.pieces[i].composer.last_name}</em>)`
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