const appointment_controller = require('../controllers/appointment_controller');
const authentication = require('../middleware/authentication');

module.exports = (app) => {
    app.post('/appointment', appointment_controller.registre_appointment)
    app.post('/appointment/many', appointment_controller.save_many)
    
    app.get('/appointment', appointment_controller.appointment_list)
    app.get('/appointment/search', authentication, appointment_controller.findByParams)
    app.get('/appointment/employee_search', authentication, appointment_controller.findByParamsEmployee)
    app.get('/appointment/commission', authentication, appointment_controller.findCommission)
    app.get('/appointment/day', appointment_controller.count_appointment_per_day)
    app.get('/appointment/month', appointment_controller.count_appointment_per_month)
    app.get('/appointment/average-time-by-employee', appointment_controller.average_time_by_employee)
    
    app.delete('/appointment/:id', appointment_controller.delete_appointment)
    
    app.put('/appointment/:id', appointment_controller.update)
}