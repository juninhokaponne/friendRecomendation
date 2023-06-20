# Recomendador de amigos

Projeto criado para um desafio do processo seletivo da ewally.

## Como Executar

Siga as etapas abaixo para executar o projeto localmente em seu ambiente de desenvolvimento.

### Pré-requisitos

- Certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo em [https://nodejs.org](https://nodejs.org).

## Rodando localmente

Clone o projeto

```bash
  git clone [https://link-para-o-projeto](https://github.com/juninhokaponne/friendRecomendation.git)
```

Entre no diretório do projeto

```bash
  cd challenger
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```

## Referência

- [Requisitos para funcionalidades](https://communication-assets.gupy.io/production/companies/51551/emails/1686938256054/communication-assets-3bb42930-0c6f-11ee-a60e-f18a54602daa/enunciado.pdf)

## Stack utilizada

**Back-end:** Node, Express, Nodemon, Jest, Supertest

## Documentação da API

#### Cria um usuário

```http
  POST /person
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `cpf`     | `number` | **Obrigatório** |
| `name`    | `string` | **Obrigatório** |

#### Retorna um usuário

```http
  GET /person/:CPF
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `cpf`     | `number` | **Obrigatório** |

#### Clean - Apaga todos registros

```http
  DELETE /clean
```

#### Cria uma relação entre dois cpf

```http
  POST /relationship
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `cpf1`    | `number` | **Obrigatório** |
| `cpf2`    | `number` | **Obrigatório** |

#### Sugere uma recomendação de amigo

```http
  GET /recommendations/:CPF
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `cpf`     | `number` | **Obrigatório** |

## Licenças

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
