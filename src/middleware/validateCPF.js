const AppError = require('../errors/error');

function validateCPF(req, res, next) {
  const { cpf } = req.body;

  if (!cpf || cpf.toString().length !== 11) {
    throw new AppError('CPF must contain exactly 11 numeric digits.', 400);
  }

  next();
}

module.exports = validateCPF;
