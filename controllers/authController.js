const userDB = {
    users : require('../model/users.json'),
    setUsers: function(data) {this.users = data}
}

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fsPromises = require('fs').promises
require('dotenv').config()
const path = require('path')


const handlelogin = async (req, res) =>{
    const {user, pwd} = req.body
    if(!user || !pwd) res.status(400).json({'message':'username and password required'})
    const founduser =userDB.users.find(person => person.username === user)
    if(!founduser) return res.sendStatus(401) //unauthorized
    const match = await bcrypt.compare(pwd, founduser.password)
    if(match){
        //JWT
        const accessToken = jwt.sign(
            {"username" : founduser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )
        const refreshToken = jwt.sign(
            {"username" : founduser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        //saving refresh token with current user
        const otherusers = userDB.users.filter(person => person.username !== founduser.username)
        const currentuser = {...founduser, refreshToken}
        userDB.setUsers([...otherusers, currentuser])
        await fsPromises.writeFile(path.join(__dirname,'..','model','users.json'), JSON.stringify(userDB.users))
        
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
        res.json({accessToken})
    }else{
        res.sendStatus(401)
    }
}

module.exports = {handlelogin}