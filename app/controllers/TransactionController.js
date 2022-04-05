const Mongo = require('../config/database/Mongo');
const ShopController = require('./ShopController');
const UserController = require('./UserController');
const CustomValidator = require('../helpers/CustomValidator');
const Transaction = require('../models/Transaction');
const config = require('../config/settings.json');

const shopController = new ShopController();
const userController = new UserController();
const customValidator = new CustomValidator();

class TransactionController extends Mongo {

    constructor() {

        super();
    }

    routes() {

        return {
            create: '/transaction/create',
            list: '/transaction/list'
        };
    }

    create() {

        try {

            return (async (req, resp) => {

                req.assert("amount", config.alerts.transaction.credit_is_numeric).isNumeric();

                const errors = req.validationErrors();

                if (errors) {
                    resp.status(401).json(errors);
                    return false;
                }

                let data = req.body;

                const amount = parseFloat(data.amount);

                data.amount = amount;

                const shopOrigem = await shopController.checkCnpj(data.cnpj_origem);
                const shopDestino = await shopController.checkCnpj(data.cnpj_destino);

                data.shopOrigem = shopOrigem;
                data.shopDestino = shopDestino;

                const validator = customValidator.validateTransaction(data, resp);

                if (!validator) {
                    return false;
                }

                await shopController.updateCredit({
                    id: shopOrigem._id,
                    credit: (shopOrigem.credit - amount)
                });

                await shopController.updateCredit({
                    id: shopDestino._id,
                    credit: (shopDestino.credit + amount)
                });

                const user = await userController.findById(req.params.user_id);

                data.cpf_user = user.cpf;

                const transaction = new Transaction(data);

                transaction.save((error) => {

                    if (error) {
                        resp.status(500).json(error);
                        return false;
                    }

                    resp.status(200).json(
                        {
                            msg: config.alerts.transaction.create_success
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

                Transaction.find((error, extrato) => {

                    if (error) {
                        resp.status(500).json(error);
                        return false;
                    }

                    resp.status(200).json(extrato);

                });
            }
        } catch (err) {
            resp.status(500).json(err);
        }
    }
}

module.exports = TransactionController;