const Middleware = require('../Middleware');
const config = require('../settings.json');

class Mongo {

    constructor() {

        try {

            const uri = config.mongodb.development;

            const mongoose = Middleware.mongoose();

            mongoose.Promise = global.Promise;

            mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

            const mongoConnect = mongoose.connection;

        } catch (err) {

            mongoConnect.on('error', err =>
                console.log('\n Mongoose! Connection error: ' + err));

        }
    }
}

module.exports = Mongo;