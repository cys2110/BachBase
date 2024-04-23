const body = document.querySelector('.pieces-body')
const sidebar = document.querySelector('#pieces-sidebar')

const getAllPieces = async() => {
    const call = await axios.get(`http://localhost:3001/pieces`)
    const response = call.data
    for(let i=0; i<response.length; i++){
        const container = document.createElement('div')
        const link = document.createElement('a')
        link.innerHTML = response[i].piece
        link.href = `../html/piece.html?id=${response[i]._id}`
        const paragraph = document.createElement('p')
        paragraph.innerHTML = `${response[i].composer.full_name}`
        container.appendChild(link)
        container.appendChild(paragraph)
        body.appendChild(container)
    }
}

getAllPieces()