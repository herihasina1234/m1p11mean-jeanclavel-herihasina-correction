const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose_created = require('./src/database/mongodb')

const app = express()
const port = process.env.PORT || 3000

// /*MIDDLEWARE===============================================================================================================================================================================================*/
app.use(bodyParser.json())
    .use(cors())

// /*ROUTES===================================================================================================================================================================================================*/
require('./src/routes/user_route')(app)
require('./src/routes/service_route')(app)
require('./src/routes/offer_route')(app)
require('./src/routes/employee_service_route')(app)
require('./src/routes/customer_preference_route')(app)
require('./src/routes/appointment_route')(app)
require('./src/routes/role_route')(app)

// /*GESTION_DES_ERREURS===============================================================================================================================================================================================*/
mongoose_created
    .on('connected', () => {
        server = app.listen(port, () => console.log(`Notre application Node est demarre sur : http://localhost:${port}`))
    })
    .on('reconnected', () => {
        console.log(`Connection vers la base de donnees retablie.`)
    })
    .on('disconnected', () => {
        if (server)
            server.close()
        console.log(`Le server est deconnecte de la base de donnees.`)
    })
    .on('error', () => {
        console.log(`Un erreur s'est produit lors de la connection du server vers la base de donnees.`)
    })