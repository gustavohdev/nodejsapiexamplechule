const Mongo = require('../config/database/Mongo');
const Middleware = require('../config/Middleware');
const Shop = require('../models/Shop');
const config = require('../config/settings.json');

class ShopController extends Mongo {

    constructor() {

        super();
    }

    routes() {

        return {
            create: '/shop/create',
            list: '/shop/list'
        };
    }

    checkCnpj(cnpj) {

        return Shop.findOne({cnpj: cnpj}).exec()
            .then(result => result)
            .catch(error => error);
    }

    updateCredit(data) {

        return Shop.findByIdAndUpdate(data.id, {credit: data.credit}).exec()
            .then(result => result)
            .catch(error => error);
    }

    create() {

        try {

            return (async (req, resp) => {

                let data = req.body;

                const validaCnpj = Middleware.validator().cnpj.isValid(data.cnpj);

                if (!validaCnpj) {
                    resp.status(401).json({msg: config.alerts.shop.cnpj_check});
                    return false;
                }

                const shopOrigem = await this.checkCnpj(data.cnpj);

                if (shopOrigem !== null) {

                    resp.status(401).json(
                        {
                            msg: config.alerts.shop.create_error
                        });

                    return false;
                }

                const shop = new Shop(data);

                shop.save((error) => {

                    if (error) {
                        resp.status(500).json(error);
                        return false;
                    }

                    resp.status(200).json(
                        {
                            msg: config.alerts.shop.create_success
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

                Shop.find((error, lojas) => {

                    if (error) {
                        resp.status(500).json(error);
                        return false;
                    }

                    resp.status(200).json(lojas);

                });
            }
        } catch (err) {
            resp.status(500).json(err);
        }
    }
}

module.exports = ShopController;