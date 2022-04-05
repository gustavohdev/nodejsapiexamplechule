const Mongo = require('../config/database/Mongo');
const Crypto = require('../helpers/Crypto');
const Middleware = require('../config/Middleware');
const User = require('../models/User');
const config = require('../config/settings.json');

class UserController extends Mongo {

    constructor() {

        super();
    }

    routes() {

        return {
            create: '/user/create',
            list: '/user/list'
        };
    }

    findById(id) {

        return User.findById(id).exec()
            .then(result => result)
            .catch(error => error);
    }

    create() {

        try {

            return ((req, resp) => {

                req.assert("cpf", config.alerts.user.cpf_required).notEmpty().isString().len(14, 14);
                req.assert("email", config.alerts.user.email_required).notEmpty().isEmail();
                req.assert("password", config.alerts.user.password_required).notEmpty().len(5, 10);

                const errors = req.validationErrors();

                if (errors) {
                    resp.status(401).json(errors);
                    return false;
                }

                let data = req.body;

                const validaCpf = Middleware.validator().cpf.isValid(data.cpf);

                if (!validaCpf) {
                    resp.status(401).json({msg: config.alerts.user.cpf_check});
                    return false;
                }

                User.findOne(
                    {
                        $or:
                            [
                                {cpf: data.cpf},
                                {email: data.email}
                            ]
                    }, (error, usuario) => {

                        if (error) {
                            resp.status(500).json(error);
                            return false;
                        }

                        if (usuario) {

                            resp.status(401).json(
                                {
                                    msg: config.alerts.user.create_error
                                });

                            return false;
                        }

                        data = Object.assign(data, {

                            password: Crypto.cipher(data.password)

                        });

                        const user = new User(data);

                        user.save((error) => {

                            if (error) {
                                resp.status(500).json(error);
                                return false;
                            }

                            resp.status(200).json(
                                {
                                    msg: config.alerts.user.create_success
                                });
                        });
                    });
            });
        } catch (err) {
            resp.status(500).json(err);
        }
    }

    list() {

        try {

            return (req, resp) => {

                User.find((error, usuarios) => {

                    if (error) {
                        resp.status(500).json(error);
                        return false;
                    }

                    resp.status(200).json(usuarios);

                });
            }
        } catch (err) {
            resp.status(500).json(err);
        }
    }
}

module.exports = UserController;