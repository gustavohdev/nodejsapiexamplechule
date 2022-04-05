const LoginController = require('../controllers/LoginController');
const UserController = require('../controllers/UserController');

const loginController = new LoginController();
const userController = new UserController();

module.exports = (app) => {

    const userRoutes = userController.routes();
    const loginRoutes = loginController.routes();

    app.route(userRoutes.create)
        .post(userController.create());

    app.route(loginRoutes.login)
        .post(loginController.login());

    app.route(userRoutes.list)
        .get(userController.list());

}