const ShopController = require('../controllers/ShopController');
const Token = require('../helpers/Token');

const shopController = new ShopController();

module.exports = (app) => {

    const shopRoutes = shopController.routes();

    app.route(shopRoutes.create)
        .post(Token.verifyJWT, shopController.create());

    app.route(shopRoutes.list)
        .get(Token.verifyJWT, shopController.list());

}