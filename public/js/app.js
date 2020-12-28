console.log('Client side javascript is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const url = "http://localhost:3000/weather?address=" + location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = 'Error, unavailable to fetch data'
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})