

const path= require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//define path for express config

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')//.. to move up a folder
const partialsPath=path.join(__dirname,'../templates/partials')
const viewsPath= path.join(__dirname,'../templates/views')
//set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(
    express.static(publicDirectoryPath)
)


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather ',
        name:'Rishi',
        forecast:'Drop down your location to find the Weather Forecast '
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Rishi',
        helpText:'These are your help contents'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Rishi',
        aboutText:'Studying Btech'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error)
        {
            return res.send({
                error:'Unable to find location'
            })
        }
        forecast(data.latitude,data.longitude,(error,forecastData={})=>{
            if(error)
            {
                return res.send({
                    error:'Unable to find weather data'
                })
            }
            res.send({
                forecast:forecastData,
                locationData:data
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('helpError',{
        title:'Error',
        name:'Rishi',
        erroText:'Help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error',
        name:'Rishi',
        errorText:'Error 404 page not found'
    })
})

app.listen(3001,()=>{
    console.log('server is on port 3001')
})