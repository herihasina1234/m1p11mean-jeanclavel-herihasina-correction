const appointment_controller = require('../controllers/appointment_controller');

module.exports = (app) => {
    app.post('/appointment', appointment_controller.registre_appointment)
    app.get('/appointment', appointment_controller.appointment_list)
    app.get('/appointment/day', appointment_controller.count_appointment_per_day)
    app.delete('/appointment/:id', appointment_controller.delete_appointment)
}