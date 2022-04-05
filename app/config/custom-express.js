const Middleware = require('./Middleware');

const express = Middleware.express();

const expressValidator = Middleware.expressValidator();

const consign = Middleware.consign();

const bodyParser = Middleware.bodyParser();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(expressValidator());

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

consign()
    .include('./app/routes')
    .into(app)

module.exports = app;
