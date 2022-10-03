const express = require('express')
const app = express()
const {logger} = require('./middleware/logevent')
const {errorHandler} = require('./middleware/errorhandler')
const verifyJWT = require('./middleware/verifyjwt')
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieparser = require('cookie-parser')
const PORT = process.env.PORT || 3500


app.use(cors(corsOptions))

//custom middleware
app.use(logger)
//built-in middlewares
//middle ware to handle form data/encoded data
//'content type: application/x-www-form-urlenconded'
app.use(express.urlencoded({extended: false}))

//built-in middleware for json
app.use(express.json())

// middleware for cookie
app.use(cookieparser())

// serve static file
app.use(express.static(path.join(__dirname,'./public')))
// app.use('/subdir', express.static(path.join(__dirname,'./public')))

app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))

app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'))

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views','404.html'))
    }else if(req.accepts('json')){
        res.json({error:"404 - does not exist"})
    }else{
        res.type('txt').send('404 Not found')
    }
})
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`server running on port: ${PORT}`))