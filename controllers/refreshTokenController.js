const userDB = {
    users : require('../model/users.json'),
    setUsers: function(data) {this.users = data}
}

const jwt = require('jsonwebtoken')
require('dotenv').config()


const handlerefreshToken = (req, res) =>{
    const cookies = req.cookies
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    if(!cookies?.jwt) res.sendStatus(400)
    const founduser =userDB.users.find(person => person.refreshToken === refreshToken)
    if(!founduser) return res.sendStatus(403) //forbidden
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || founduser.username !== decoded.username) return res.sendStatus(403)
             const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )
           res.json({accessToken})
        }
    )

   
}

module.exports = {handlerefreshToken}