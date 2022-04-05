const config = require('../config/settings.json');

class CustomValidator {

    validateTransaction(data, resp) {

        if (data.amount <= 0) {
            resp.status(401).json({msg: config.alerts.transaction.credit_maior_zero});
            return false;
        }

        if (data.shopOrigem === null) {
            resp.status(401).json({msg: config.alerts.transaction.check_cnpj_origem});
            return false;
        }

        if (data.shopDestino === null) {
            resp.status(401).json({msg: config.alerts.transaction.check_cnpj_destino});
            return false;
        }

        if (data.cnpj_origem === data.cnpj_destino) {
            resp.status(401).json({msg: config.alerts.transaction.check_origem_destino});
            return false;
        }

        if (data.shopOrigem.credit < data.amount) {
            resp.status(401).json({msg: config.alerts.transaction.credit_no_credit});
            return false;
        }

        return true;
    }
}

module.exports = CustomValidator;