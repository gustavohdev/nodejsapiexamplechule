const Middleware = require('../config/Middleware');

const mongoose = Middleware.mongoose();
const Schema = mongoose.Schema;

const TransationSchema = new Schema({

    cnpj_origem: {type: String, required: true},
    cnpj_destino: {type: String, required: true},
    cpf_user: {type: String, required: true},
    amount: {type: Number, required: true},
    dt_create: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Transaction', TransationSchema);
