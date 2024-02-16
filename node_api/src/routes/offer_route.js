const offer_special_controller = require('../controllers/offer_special_controller');

module.exports = (app) => {
    app.post('/offer-special', offer_special_controller.registre_offer)
    app.get('/offer-special', offer_special_controller.offer_list)
    app.delete('/offer-special/:id', offer_special_controller.delete_offer)
}