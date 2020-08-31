const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=923f421d4853452880de231f936cfac7&query='+latitude+','+ longitude +'&units=f'
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect to weather stack')
        }
        else if(response.body.error)
        {
            callback('unable to find location')
        }
        else{
            callback(undefined,{
                forecast:'Forecast : The current temperature is '+response.body.current.temperature+"degrees .It feels like "+ response.body.current.feelslike + " degrees .The wind speed is "+ response.body.current.wind_speed+"."
                /*temperature:response.body.current.temperature,
                feelslike:response.body.current.feelslike,*/
            })

        }
    })
}
module.exports= forecast