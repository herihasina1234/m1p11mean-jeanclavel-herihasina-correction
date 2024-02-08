const { default: mongoose } = require("mongoose")

/*BDD_CONFIGURATION=========================================================================================================================================================================================*/ 
let dbURI 
let options
if(process.env.NODE_ENV === 'production'){
    dbURI = ''
    options = {}
} else{    
    dbURI = 'mongodb://localhost:27017/bookstore';            
    //options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    options = {}
}

function getConnection(){
    return mongoose.createConnection(dbURI, options)        
}

module.exports = getConnection;
