const relationshipControllerMock = {
  relationships: [
    { cpf1: '12345678901', cpf2: '98765432109' },
    { cpf1: '11111111111', cpf2: '22222222222' },
    { cpf1: '33333333333', cpf2: '44444444444' },
  ],
  people: [
    { cpf: '12345678901', name: 'John Doe' },
    { cpf: '98765432109', name: 'Jane Smith' },
    { cpf: '11111111111', name: 'Alice Johnson' },
    { cpf: '22222222222', name: 'Bob Anderson' },
    { cpf: '33333333333', name: 'Charlie Brown' },
    { cpf: '44444444444', name: 'David Davis' },
  ],
  setPeople: jest.fn(),
  createRelationship: jest.fn(),
  getRecommendations: jest.fn(),
};

module.exports = relationshipControllerMock;
