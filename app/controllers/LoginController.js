const Mongo = require('../config/database/Mongo');
const Token = require('../helpers/Token');
const Crypto = require('../helpers/Crypto');
const User = require('../models/User');
const config = require('../config/settings.json');

class LoginController extends Mongo {

    constructor() {

        super();
    }

    routes() {

        return {
            login: '/user/login'
        };
    }

    login() {

        try {

            return (req, resp) => {

                req.assert("email", config.alerts.user.email_required).notEmpty().isString();
                req.assert("password", config.alerts.login.password_is_string).notEmpty().isString();

                const errors = req.validationErrors();

                if (errors) {
                    resp.status(401).json(errors);
                    return false;
                }

                User.findOne(
                    {
                        email: req.body.email,
                        password: Crypto.cipher(req.body.password)
                    }, (error, usuario) => {

                        if (error) {
                            resp.status(500).json(error);
                            return false;
                        }

                        if (!usuario) {

                            resp.status(401).json(
                                {
                                    auth: false,
                                    token: null,
                                    msg: config.alerts.login.error
                                });

                            return false;
                        }

                        const token = Token.generateJWT(usuario._id);

                        resp.status(200).json(
                            {
                                auth: true,
                                token: token,
                                msg: config.alerts.login.sucess
                            });

                    });
            }
        } catch (err) {
            resp.status(500).json(err);
        }
    }
}

module.exports = LoginController;