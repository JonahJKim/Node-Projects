// targets search form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

// targets html elements
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// sets up event listener for search form
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data.location 
        messageTwo.textContent = data.forecastData
    })
})
})
