const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const getConnection = require('./src/database/mongodb')

const app = express()
const port = process.env.PORT || 3000
let mongoose_connection
let server

/*MIDDLEWARE===============================================================================================================================================================================================*/
app.use(bodyParser.json())

/*MONGODB===============================================================================================================================================================================================*/
mongoose_connection = getConnection()


/*ROUTES===================================================================================================================================================================================================*/


/*GESTION_DES_ERREURS===============================================================================================================================================================================================*/
mongoose_connection
    .on('connected', () => { 
        server = app.listen(port, () => console.log(`Notre application Node est demarre sur : http://localhost:${port}`))
    })
    .on('reconnected', () => { 
        console.log(`Connection vers la base de donnees retablie.`)
    })
    .on('disconnected', () => {
        server.close()
        console.log(`Le server est deconnecte de la base de donnees.`)
    })
    .on('error', () => {
        console.log(`Un erreur s'est produit lors de la connection du server vers la base de donnees.`)
    })


