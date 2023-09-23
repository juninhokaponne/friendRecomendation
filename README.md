# Friend Recommender

This project aims to use a simple recommendation algorithm, initially it was made for a challenge and today it counts as a free repository for everyone to contribute.

## How to Run

Follow the steps below to run the project locally in your development environment.

### Prerequisites

- Ensure you have Node.js installed on your system. You can download it from [https://nodejs.org](https://nodejs.org).

## Running Locally

Clone the project

```bash
  git clone https://github.com/juninhokaponne/friendRecomendation.git
```

Navigate to the project directory

```bash
  cd friendRecomendation
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running Tests

To run the tests, execute the following command

```bash
  npm run test
```

## Reference

- [Functional Requirements (PDF)](https://communication-assets.gupy.io/production/companies/51551/emails/1686938256054/communication-assets-3bb42930-0c6f-11ee-a60e-f18a54602daa/enunciado.pdf)

## Used Stack

**Back-end:** Node, Express, Nodemon, Jest, Supertest

## API Documentation

#### Create a User

```http
  POST /person
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `cpf`     | `number` | **Obrigatório** |
| `name`    | `string` | **Obrigatório** |

#### Retrieve a User

```http
  GET /person/:CPF
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `cpf`     | `number` | **Obrigatório** |

#### Clean - Delete all records

```http
  DELETE /clean
```

#### Create a Relationship between two CPFs

```http
  POST /relationship
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `cpf1`    | `number` | **Obrigatório** |
| `cpf2`    | `number` | **Obrigatório** |

#### Get Friend Recommendations

```http
  GET /recommendations/:CPF
```

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `cpf`     | `number` | **Obrigatório** |

## How to Contribute

If you'd like to contribute to this repository over time, please follow these guidelines:

1. Fork the project 
2. Clone the forked repository to your local machine.
3. Make your desired changes and improvements.
4. Create a new branch for your changes.
5. Commit your changes with clear and concise commit messages.
6. Push your changes to your forked repository.
7. Create a pull request to the original repository, explaining your changes and why they should be merged

Thank you for considering contributing to this project! Your contributions are highly appreciated.

## Licenses

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
