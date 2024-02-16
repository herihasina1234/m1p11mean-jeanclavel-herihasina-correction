const { default: mongoose } = require("mongoose")

/*BDD_CONFIGURATION=========================================================================================================================================================================================*/
let dbURI
let options
process.env.NODE_ENV = 'dev'
if (process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb+srv://rasamimananaherihasina:mongohery@cluster0.cr4g85i.mongodb.net/?retryWrites=true&w=majority'
    options = {}
} else {
    dbURI = 'mongodb://127.0.0.1:27017/salonDeBeaute';
    options = {}
}

function getConnection() {
    mongoose.connect(dbURI, options)
    return mongoose.createConnection(dbURI, options)
}

const mongoose_created = getConnection();
const mongoose_connected = mongoose.connect(dbURI, options);

module.exports = mongoose_created, mongoose_connected;