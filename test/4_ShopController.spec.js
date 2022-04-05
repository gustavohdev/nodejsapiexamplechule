const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const express = require('../app/config/custom-express');

const config = require('../app/config/settings.json');

const token = require('../app/helpers/Token');

const token_test = token.generateJWT(config.jwt.expiresIn);

chai.use(http);
chai.use(subSet);

const shopSchema =
    {
        _id: _id => _id,
        cnpj: cpf => cpf,
        razao_social: razao_social => razao_social,
        credit: credit => credit,
        dt_create: dt_create => dt_create
    };

describe('Teste de Rotas - ShopController', () => {

    it('/shop/create - POST', () => {
        chai.request(express)
            .post('/shop/create')
            .set('Authorization', token_test)
            .send({
                cnpj: '06.990.590/0001-23',
                razao_social: 'Loja de Teste'
            })
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
            });
    });

    it('/shop/list - GET', () => {
        chai.request(express)
            .get('/shop/list')
            .set('Authorization', token_test)
            .end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.containSubset([shopSchema]);
            });
    });
});