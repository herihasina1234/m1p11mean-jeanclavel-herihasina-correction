const { default: mongoose } = require("mongoose")

/*BDD_CONFIGURATION=========================================================================================================================================================================================*/ 
let dbURI 
let options
if(process.env.NODE_ENV === 'production'){
    dbURI = 'mongodb+srv://rasamimananaherihasina:mongohery@cluster0.cr4g85i.mongodb.net/?retryWrites=true&w=majority'
    options = {}
} else{    
    dbURI = 'mongodb://127.0.0.1:27017/salonDeBeaute';            
    //options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }    
    options = {}
}

function getConnection(){
    mongoose.Promise = global.Promise;
    return mongoose.createConnection(dbURI, options)        
}

const conn = mongoose.createConnection(dbURI, options) ;

module.exports = getConnection;
module.exports = conn;
