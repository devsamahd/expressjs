const {logevents} = require('./logevent')
const errorHandler = (err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(err.message)
    logevents(`${err.name}: ${err.message}`, 'errlog.txt')
    console.log(`${req.method} ${req.url}`)
}

module.exports = {errorHandler}

