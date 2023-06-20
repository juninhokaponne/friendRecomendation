const PersonController = require('../src/controller/PersonController');
const AppError = require('../src/errors/error');

describe('PersonController', () => {
  let personController;

  beforeEach(() => {
    personController = new PersonController();
  });

  describe('createPerson', () => {
    it('should create a new person successfully', () => {
      const result = personController.createPerson('12345678909', 'John Doe');

      expect(result).toEqual({ cpf: '12345678909', name: 'John Doe' });
      expect(personController.people).toHaveLength(1);
    });

    it('should throw an error if the CPF is invalid', () => {
      expect(() => {
        personController.createPerson('123', 'Bob');
      }).toThrow('CPF must contain exactly 11 numeric digits');
    });

    it('should throw an error if the user already exists', () => {
      personController.createPerson('12345678909', 'John Doe');

      expect(() => {
        personController.createPerson('12345678909', 'Jane Smith');
      }).toThrow(AppError);
    });
  });
});
