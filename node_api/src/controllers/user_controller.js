const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { default: mongoose } = require("mongoose")
const conn = require('../database/mongodb')

module.exports.save = async (req, res) => {
    const salt = await bcrypt.genSalt();    
    let { email, password, name, firstname } = req.body;
    
    //encrypt password
    bcrypt.hash(password, salt)
    .then( async hash => {
        //save user
        password = hash
        await User.create({ email, password, name, firstname })
            .then ( user => {                   
                const message = "user added successfully"                 
                res.status(201).json({message: message, data: user});
            })
            .catch( error => {
                return res.status(400).json({message: error.message, data: error})
            })            
        })        
}
