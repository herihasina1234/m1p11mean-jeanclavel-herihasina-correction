const appointment_controller = require('../controllers/appointment_controller');
const authentication = require('../middleware/authentication');

module.exports = (app) => {
    app.post('/appointment', appointment_controller.registre_appointment)
    app.get('/appointment', appointment_controller.appointment_list)
    app.get('/appointment/day', appointment_controller.count_appointment_per_day)
    app.get('/appointment/month', appointment_controller.count_appointment_per_month)
    app.get('/appointment/average-time-by-employee', appointment_controller.average_time_by_employee)
    app.get('/appointment/revenue-per-day', appointment_controller.revenue_per_day)
    app.get('/appointment/revenue-per-month', appointment_controller.revenue_per_month)
    app.delete('/appointment/:id', appointment_controller.delete_appointment)
}