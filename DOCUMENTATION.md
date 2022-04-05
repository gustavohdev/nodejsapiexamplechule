### SUMÁRIO

* [Introdução](#introdução)
* [Arquitetura](#arquitetura)
* [Instalação](#instalação)
* [Endpoints](#endpoints)
* [Testes](#testes)
* [Restrições](#restrições)

## INTRODUÇÃO

Este documento tem como objetivo definir e especificar os requisitos de funcionamento da API REST de teste de Desenvolvedor Back-End que será desenvolvida para a empresa Paytime Tecnologia, localizada em Av. Anísio Fernandes Coelho, 1660, Jardim Da Penha, Vitoria - ES, 29060670.

Formalmente, podemos definir que o documento contém: “Os serviços e funcionalidades que a API provê”, informações sobre a arquitetura da aplicação, bem como restrições.

#### VISÃO GERAL DO SISTEMA PROPOSTO

O objetivo é construir um sistema de transferência entre contas.
Criar o cadastro do usuário e logo em seguida criar o estabelecimento, lembrando que não pode criar um usário com o mesmo CPF e email e a loja com o mesmo CPNJ;
Apos ativar o usuário e criar a loja, criar uma rota para criar a transferência e uma outra para a  listagem;

## ARQUITETURA

#### Descrição

O Serviço foi desenvolvido em [NodeJs](https://nodejs.org/en/) com a utilização do [express](https://www.npmjs.com/package/express) que encapsula uma REST API.

O padrão utilizado foi o [MVC](https://www.portalgsti.com.br/2017/08/padrao-mvc-arquitetura-model-view-controller.html), conforme boas práticas de programação orientada a objetos.

Alguns conceitos de estruturação de pastas, arquivos e rotas, foram aplicados conforme algumas orientações adquiridas em cursos realizados no [Alura Cursos](https://www.alura.com.br).

#### Tecnologias Utilizadas

- [Docker Containers](https://www.docker.com/)
- [NodeJs](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## INSTALAÇÃO

#### Pré-requisitos

- [Docker](https://www.docker.com/)

Com o Docker instalado, crie uma docker network "rede-local" que será responsável em conectar o API com o MongoDB.

````
docker network create rede-local
````

Output:
````
9fb7b60e82e6d9134ceb91e6bded1f8fed03d91c2d16353adb8608898a217468
````

Após a criação da network, navegue até a pasta raiz do projeto.
````
/pasta/local/
__desafio-backend
|___app
|___test
|... /*outros arquivos*/
|___start.docker.sh
````

No Linux execute o shellScript start.docker.sh

###### Obs: Se o sistema operacional for diferente de Linux, abra o arquivo start.docker.sh com algum editor de texto, copie os comandos docker e execute-os manualmente.

````
$ sh start.docker.sh
````

Output:
````
34da58e85e6feceaa7ede1855b52afc5bfc10d96b2d2c960796263ac24181fca
165e3d2e8287b9bd80d0c488d35eb4232c5b38f9ef53a72f08ddb741523e25c5
root@165e3d2e8287:/var/www# 

````

Agora instale os componentes do NodeJs.

````
$ npm install
````

Output:
````
18 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

````

Inicie o serviço com npm start

````
$ npm start
````

Output:
````
> BackEndPaytimevix@1.0.0 start /var/www
> nodemon server.js

[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
consign v0.1.6 Initialized in /var/www
+ ./app/routes/shop.routes.js
+ ./app/routes/transaction.routes.js
+ ./app/routes/user.routes.js
+ ./app/routes/x.routes.js
Server startup on port 3000

````

A API localhost é servida pela porta 3000.

localhost:3000

### ENDPOINTS

#### MÉTODOS

###### POST
- /user/create => Cadastrar um novo usuário,
- /user/login => Efetuar autenticação de usuário,
- /shop/create => Cadastrar uma nova loja,
- /transaction/create => Criar uma nova transação.


###### GET
- /user/list => Listar todos os usuários cadastrados,
- /shop/list => Listar todos as lojas cadastras,
- /transaction/list => Listas todas as transações realizadas.



#### AUTENTICAÇÃO

As rotas de acesso as lojas e as transações necessitam de autenticação via [JWT](https://jwt.io/). No cabeçalho da requisição deverá ser informado o token de acesso, logo, será necessário efetuar login.

````
header('Authorization') = "MEU-TOKEN"
````

/user/login

````
{
    "email": "teste@usuario_teste.com",
    "password": "meu-password"
}
````

Output:
````
 {
    "auth": TRUE,
    "msg": "MSG",
    "token": "SEU-NOVO-TOKEN"
 }
````

Para efetuar o cadastro de um novo usuário:

/user/create

````
{
    "cpf": "000.000.000-00",
    "email": "meu-email.com",
    "password": "minha-nova-senha"
}
````

Para efetuar o cadastro de um nova loja:

/shop/create

````
{
    "cnpj": "00.000.000/0001-00",
    "razao_social": "meu-email.com",
    "credit": "1000"
}
````

Para efetuar uma transação:

/transaction/create

````
{
    "cnpj_origem": "00.000.000/0001-00",
    "cnpj_destino": "00.000.000/0001-00",
    "amount": "200.50"
}
````

### TESTES

- Integração
- Função

Pasta raiz do projeto dentro do container Node:

````
/var/www/
__desafio-backend
|___app
|___test
|... /*outros arquivos*/
|___start.docker.sh
````

Comando:

````
$npm run test
````

Output:

````
> BackEndPaytimevix@1.0.0 test /var/www
> mocha test --exit

consign v0.1.6 Initialized in /var/www
+ ./app/routes/shop.routes.js
+ ./app/routes/transaction.routes.js
+ ./app/routes/user.routes.js
+ ./app/routes/x.routes.js


  Teste de Função - Token
    ✓ generateJWT

  Teste de Rotas - UserController
    ✓ /user/create - POST
    ✓ /user/list - GET

  Teste de Rotas - LoginController
    ✓ /user/login - POST
(node:115) [DEP0106] DeprecationWarning: crypto.createCipher is deprecated.
(Use `node --trace-deprecation ...` to show where the warning was created)

  Teste de Rotas - ShopController
    ✓ /shop/create - POST
    ✓ /shop/list - GET


  6 passing (153ms)


````

## RESTRIÇÕES

##### Container com [MongoDB](https://www.mongodb.com/)
- Não possui usuário root, segurança não aplicada.
- Não possui persistência. Assim que a instância é desligada, os dados são perdidos.
###### Obs: Utilizado apenas para testar o serviço.

##### Testes com [Chai](https://www.npmjs.com/package/chai) e [Mocha](https://www.npmjs.com/package/mocha)
- Alguns testes não serão realizados se o banco de dados estiver desligado, levando em consideração o teste de rotas com acesso ao mesmo.
