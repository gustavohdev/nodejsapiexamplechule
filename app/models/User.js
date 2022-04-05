const Middleware = require('../config/Middleware');

const mongoose = Middleware.mongoose();
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    cpf: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dt_create: {type: Date, default: Date.now}

});

module.exports = mongoose.model('User', UserSchema);
