const Middleware = require('../config/Middleware');
const config = require('../config/settings');

const crypto = Middleware.crypto();

class Crypto {

    static cipher(password) {

        let mykey = crypto.createCipher(config.crypto.algorithm, config.crypto.mysecret);
        let cryptoKey = mykey.update(password, 'utf8', 'hex')

        cryptoKey += mykey.final('hex');

        return cryptoKey;
    }

    static decipher(password) {

        let mykey = crypto.createDecipher(config.crypto.algorithm, config.crypto.mysecret);
        let descryptoKey = mykey.update(password, 'hex', 'utf8')

        descryptoKey += mykey.final('utf8');

        return descryptoKey;
    }
}

module.exports = Crypto;