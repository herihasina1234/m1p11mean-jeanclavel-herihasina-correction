const employee_service_controller = require('../controllers/employee_service_controller');

module.exports = (app) => {
    app.post('/employee-service', employee_service_controller.registre_employee_service)
    app.get('/employee-service', employee_service_controller.employee_service_list)
    app.delete('/employee-service/:id', employee_service_controller.delete_employee_service)
}