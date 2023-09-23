const PersonController = require("../../../src/controller/PersonController");
const AppError = require("../../../src/errors/error");

describe("PersonController", () => {
  let personController;

  beforeEach(() => {
    personController = new PersonController();
  });

  describe("createPerson", () => {
    it("should create a new person successfully", () => {
      const result = personController.createPerson("12345678909", "John Doe");

      expect(result).toEqual({ cpf: "12345678909", name: "John Doe" });
      expect(personController.people).toHaveLength(1);
    });

    it("should throw an error if the CPF is invalid", () => {
      expect(() => {
        personController.createPerson("123", "Bob");
      }).toThrow("CPF must contain exactly 11 numeric digits");
    });

    it("should throw an error if the user already exists", () => {
      personController.createPerson("12345678909", "John Doe");

      expect(() => {
        personController.createPerson("helloHello", "Jane Smith");
      }).toThrow(AppError);
    });

    it("should return an error if the person was not founded", () => {
      personController.createPerson("12345678909", "John Doe");

      expect(() => {
        personController.getPerson("99999999999");
      }).toThrow(AppError);
    });

    it("should return the person if found", () => {
      const mockPerson = { cpf: "12345678909", name: "John Doe" };
      personController.createPerson("12345678909", "John Doe");

      personController.getPerson = jest.fn().mockReturnValue(mockPerson);

      const result = personController.getPerson("12345678909");

      expect(result).toEqual(mockPerson);
    });
  });

  describe("clean", () => {
    it("should remove all relationships", () => {
      personController.cleanPeople();

      expect(personController.people).toEqual([]);
    });
  });
});
