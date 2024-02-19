const appointment_controller = require('../controllers/appointment_controller');

module.exports = (app) => {
    app.post('/appointment', appointment_controller.registre_appointment)
    app.get('/appointment', appointment_controller.appointment_list)
    app.get('/appointment/day', appointment_controller.count_appointment_per_day)
    app.get('/appointment/month', appointment_controller.count_appointment_per_month)
    app.get('/appointment/average-time-by-employee', appointment_controller.average_time_by_employee)
    app.delete('/appointment/:id', appointment_controller.delete_appointment)
}