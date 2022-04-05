const Middleware = require('../config/Middleware');

const mongoose = Middleware.mongoose();
const Schema = mongoose.Schema;

const ShopSchema = new Schema({

    cnpj: {type: String, required: true},
    razao_social: {type: String, required: true},
    credit: {type: Number, default: 500},
    dt_create: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Shop', ShopSchema);
