# Desafio para vaga de Backend

Primeiramente, obrigado pelo seu interesse em trabalhar conosco,
A seguir você encontrará todos as informações necessárias para fazer seu teste.

## Stack do projeto

Você pode utilizar a stack em nodejs, utilizando o framework de sua escolha.

## Objetivo do desafio

- O objetivo é construir um sistema de transferencias entre contas;
Você deve criar o cadastro do usuário e logo em seguida criar o estabelecimento, lembrando que não pode criar um usário com o mesmo CPF e email e a loja com o mesmo CPNJ;
- Apos ativar o usuario e criar a loja crie uma rota para criar a tranferencia e um outra de listagem;

### Payload

POST /transaction

```json
{
    "document":"000.000.0000/00",
    "amont" : 100.00
}
```


## Diferenciais

- Organização do código
- Conhecimento de padrões (PSRs, design patterns, SOLID)
- Ser consistente e saber argumentar suas escolhas
- Apresentar soluções que domina
- Modelagem de Dados
- Manutenibilidade do Código
- Tratamento de erros
- Cuidado com itens de segurança
- Arquitetura (estruturar o pensamento antes de escrever)
- Carinho em desacoplar componentes (outras camadas, service, repository) 

## O que NÃO será avaliado
- Fluxo de cadastro de usuários e lojistas
- Frontend (só avaliaremos a API Restful)

## Como submeter?

- Commite suas alterações de forma organizada
- Você deve criar um fork deste repositorio desafio, ao terminar todo o desafio você devera abrir um "Pull Request" deste Fork.