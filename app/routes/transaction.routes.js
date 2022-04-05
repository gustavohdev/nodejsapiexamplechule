const TransactionController = require('../controllers/TransactionController');
const Token = require('../helpers/Token');

const transactionController = new TransactionController();

module.exports = (app) => {

    const transactionRoutes = transactionController.routes();

    app.route(transactionRoutes.create)
        .post(Token.verifyJWT, transactionController.create());

    app.route(transactionRoutes.list)
        .get(Token.verifyJWT, transactionController.list());

}