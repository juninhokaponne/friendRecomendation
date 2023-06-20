const RelationshipController = require('../../../src/controller/RelationshipController');

describe('RelationshipController', () => {
  let relationshipController;

  beforeEach(() => {
    relationshipController = new RelationshipController();
    relationshipController.setPeople([
      { cpf: '12345678901', name: 'John Doe' },
      { cpf: '98765432109', name: 'Jane Smith' },
      { cpf: '45678912304', name: 'Bob Johnson' },
    ]);
  });

  it('should create a relationship between two existing people', () => {
    const result = relationshipController.createRelationship(
      '12345678901',
      '98765432109',
    );
    expect(result).toBe('Relationship created successfully.');
    expect(relationshipController.relationships).toEqual([
      { cpf1: '12345678901', cpf2: '98765432109' },
    ]);
  });

  it('should return an error if one or both people do not exist', () => {
    const result1 = relationshipController.createRelationship(
      '12345678901',
      '99999999999',
    );
    expect(result1).toBe('One or both users not found.');
    expect(relationshipController.relationships).toEqual([]);

    const result2 = relationshipController.createRelationship(
      '99999999999',
      '98765432109',
    );
    expect(result2).toBe('One or both users not found.');
    expect(relationshipController.relationships).toEqual([]);
  });

  it('should return recommendations based on friend of friends', () => {
    relationshipController.createRelationship('12345678901', '98765432109');
    relationshipController.createRelationship('12345678901', '45678912304');
    relationshipController.createRelationship('98765432109', '45678912304');

    const recommendations =
      relationshipController.getRecommendations('12345678901');
    expect(recommendations).toEqual(['98765432109']);
  });

  it('should return an error if the user is not found', () => {
    const result = relationshipController.getRecommendations('99999999999');
    expect(result).toBe('User not found.');
  });
});
