const chai = require('chai');
const http = require('chai-http');
const subSet = require('chai-subset');

const token = require('../app/helpers/Token');

const config = require('../app/config/settings.json');

chai.use(http);
chai.use(subSet);

describe('Teste de Função - Token', () => {

    it('generateJWT', () => {

        chai.expect(token.generateJWT(config.jwt.expiresIn)).to.be.a('string')

    });
});