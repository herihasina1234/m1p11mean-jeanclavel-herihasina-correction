const express = require('express')
const bodyParser = require('body-parser')
const getConnection = require('./src/database/mongodb')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { isEmail } = require('validator');


const app = express()
const port = process.env.PORT || 3000
// let mongoose_connection
// let server

// /*MIDDLEWARE===============================================================================================================================================================================================*/
// app.use(bodyParser.json())
// .use(cors())

// /*MONGODB===============================================================================================================================================================================================*/
//  mongoose_connection = getConnection()

// /*ROUTES===================================================================================================================================================================================================*/
// require('./src/routes/user_route')(app)

// /*GESTION_DES_ERREURS===============================================================================================================================================================================================*/
// mongoose_connection
//     .on('connected', () => { 
//         server = app.listen(port, () => console.log(`Notre application Node est demarre sur : http://localhost:${port}`))        
//     })
//     .on('reconnected', () => { 
//         console.log(`Connection vers la base de donnees retablie.`)
//     })
//     .on('disconnected', () => {
//         if(server)
//         server.close()
//         console.log(`Le server est deconnecte de la base de donnees.`)
//     })
//     .on('error', () => {
//         console.log(`Un erreur s'est produit lors de la connection du server vers la base de donnees.`)
//     })


dbURI = 'mongodb://127.0.0.1:27017/salonDeBeaute';                
options = {}

mongoose.connect('mongodb://localhost:27017/salonDeBeaute', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { 
        const userSchema = new mongoose.Schema({
            email: {
                type: String,
                required: [true, 'Please enter an email'],
                unique: true,
                lowercase: true,
                validate: [isEmail, 'Please enter a valid email']
            },
            password: {
                type: String,
                required: [true, 'Please enter a password'],
                minlength: [6, 'Minimum password length is 6 characters'],
            },
            name: {
                type: String,
                length: [100, 'length max is 100 characters'],
        
            },
            firstname: {
                type: String,
                length: [100, 'length max is 100 characters'],
            }
        });
        
        const User = mongoose.model('User', userSchema);
                

        User.create({
            "email": "abc@gmdd.com",
            "name": "je suis",
            "firstname": "beau",
            "password": "sdfasdfasdfewefwesdf"
        })
        .then ( user => {                   
            console.log("huhu")
        })
        .catch( error => {
            console.log(error.message)
        })            
          
    })

