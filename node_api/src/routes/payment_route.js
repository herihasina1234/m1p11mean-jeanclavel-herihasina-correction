const payment_controller = require('../controllers/payment_controller');
const authentication = require('../middleware/authentication');

module.exports = (app) => {
    app.get('/payments', authentication, payment_controller.find)    
    app.post('/payments', authentication, payment_controller.save)    
}
