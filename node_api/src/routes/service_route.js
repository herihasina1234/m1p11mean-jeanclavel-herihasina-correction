const service_controller = require('../controllers/service_controller');

module.exports = (app) => {
    app.post('/service', service_controller.registre_service)
    app.get('/service', service_controller.service_list)
    app.get('/service/:id', service_controller.get_service_by_id)
    app.delete('/service/:id', service_controller.delete_service)
}