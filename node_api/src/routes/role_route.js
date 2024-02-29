const role_controller = require('../controllers/role_controller');

module.exports = (app) => {
    app.post('/role', role_controller.registre_role)
    
    app.get('/role', role_controller.role_list)
    app.get('/role/designation=:designation', role_controller.find_by_designation)
    
    app.delete('/role/:id', role_controller.delete_role)
}