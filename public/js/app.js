


const weatherForm=document.querySelector('form')
const search= document.querySelector('input')
const msgOne=document.querySelector('#msg-1')
const msgTwo=document.querySelector('#location')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    msgOne.textContent='Loading...'
    msgTwo.textContent=''

    const location=search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data) => {
        if(data.error)
        {
            msgOne.textContent=data.error
            console.log(data.error)
        }
        else{
            msgOne.textContent=data.forecast.forecast
            msgTwo.textContent=data.locationData.location
            //console.log(data.forecast)
        }
    })
})

})