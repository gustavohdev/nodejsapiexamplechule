class Middleware {

    static express() {
        const express = require('express');
        return express;
    }

    static expressValidator() {
        const expressValidator = require('express-validator');
        return expressValidator;
    }

    static consign() {
        const consign = require('consign');
        return consign;
    }

    static bodyParser() {
        const bodyParser = require('body-parser');
        return bodyParser;
    }

    static mongoose() {
        const mongoose = require('mongoose');
        return mongoose;
    }

    static fs() {
        const fs = require('fs');
        return fs;
    }

    static jwt() {
        const jwt = require('jsonwebtoken');
        return jwt;
    }

    static crypto() {
        const crypto = require('crypto');
        return crypto;
    }

    static validator() {
        const {cpf, cnpj} = require('cpf-cnpj-validator');
        return {
            "cpf": cpf,
            "cnpj": cnpj
        }
    }
}

module.exports = Middleware;