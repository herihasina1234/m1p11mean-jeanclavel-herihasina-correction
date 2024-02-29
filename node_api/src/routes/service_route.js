const service_controller = require('../controllers/service_controller');
const authentication = require('../middleware/authentication');

module.exports = (app) => {
    app.get('/services/search', authentication, service_controller.search)    
    // app.get('/service', service_controller.service_list)
    app.get('/services', authentication, service_controller.find)    
    app.get('/services/:id', authentication, service_controller.findById)    
    // app.get('/service/:id', service_controller.get_service_by_id)
    
    app.post('/services', authentication, service_controller.save) 
    app.post('/service', service_controller.registre_service)   
}
