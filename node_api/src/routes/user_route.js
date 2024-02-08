const user_controller = require('../controllers/user_controller');

module.exports = (app) => {
    app.post('/user', user_controller.save)
}
