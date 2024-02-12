const user_controller = require('../controllers/user_controller');
const authentication = require('../middleware/authentication');

module.exports = (app) => {
    app.post('/login', user_controller.login)
    app.post('/user', user_controller.save)
    app.get('/user', authentication, user_controller.find)
}
