const fs = require('fs')
const fsProm = require('fs').promises
const path = require('path')
const {format} = require('date-fns')
const {v4: uuid} = require('uuid')

const logevents = async (message, logname) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\ttHH:mm:ss')}`
    const logitem = `${dateTime}\t${uuid()}\t${message} \n`
    
    try{
        if(!fs.existsSync(path.join(__dirname,'..','./logs'))){
            await fsProm.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsProm.appendFile(path.join(__dirname, '..', 'logs', logname), logitem)
    }catch(err){
        console.log(err)
    }
    
}
const logger = (req, res, next)=>{
    logevents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqlog.txt')
    console.log(`${req.method} ${req.url}`)
    next()
}
module.exports = {logger, logevents}