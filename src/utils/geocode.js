const request=require('request')

const geocode=(adress,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ adress +'.json?access_token=pk.eyJ1IjoicmlzaGktcmFqLWthbGl0YSIsImEiOiJja2Vib2p6NmswYXdnMzVxeXVuM3FvZGRxIn0.ySPiBmMZe8mPnHCO18lJ0w&limit=1'

    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect',undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('unable to find location',undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }

    })
}
module.exports = geocode