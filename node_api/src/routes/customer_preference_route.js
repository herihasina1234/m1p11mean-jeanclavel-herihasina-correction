const customer_preference_controller = require('../controllers/customer_preference_controller');

module.exports = (app) => {
    app.post('/customer-preference', customer_preference_controller.registre_customer_preference)
    
    app.get('/customer-preference', customer_preference_controller.customer_preference_list)
    
    app.delete('/customer-preference/:id', customer_preference_controller.delete_customer_preference)
}