const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data) {this.users = data }
}
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const {user, pwd} = req.body
    if(!user || !pwd){
        res.status(400).json({'message':`username and password are required`})
    } 
    //check for duplicate usernames in the db
    const duplicate = userDB.users.find(person => person.username === user)
    if(duplicate) res.sendStatus(409) //409 conflict
    try{
        //encrypt the password
        const hashedpword = await bcrypt.hash(pwd, 10)
        //store the new user
        const newUser = {'username': user, 'password':hashedpword}
        userDB.setUsers([...userDB.users, newUser]) 
        await fsPromises.writeFile(path.join(__dirname, '..','model','users.json'),JSON.stringify(userDB.users))
        console.log(userDB.users)
        res.status(201).json({'message':`New user ${user} created`})
    }catch(err){
        console.log(err)
        res.status(500).json({'message':err.message})
    }
}

module.exports = {handleNewUser}