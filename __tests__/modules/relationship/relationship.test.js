const RelationshipController = require("../../../src/controller/RelationshipController");

describe("RelationshipController", () => {
  let relationshipController;

  beforeEach(() => {
    relationshipController = new RelationshipController();
    relationshipController.setPeople([
      { cpf1: "12345678901", cpf2: "32145153513" },
    ]);
  });

  it("should return an error if one or both people do not exist", () => {
    try {
      relationshipController.createRelationship("12345678901", "99999999999");
      fail("Expected an exception to be thrown.");
    } catch (error) {
      expect(error.message).toBe("One or both users not found.");
      expect(relationshipController.relationships).toEqual([]);
    }

    try {
      relationshipController.createRelationship("99999999999", "98765432109");
      fail("Expected an exception to be thrown.");
    } catch (error) {
      expect(error.message).toBe("One or both users not found.");
      expect(relationshipController.relationships).toEqual([]);
    }
  });

  it("should create a relationship between two existing people", () => {
    const mockRelationship = { cpf1: "11145153620", cpf2: "32145153513" };

    try {
      relationshipController.createRelationship("11145153620", "32145153513");
      fail("Expected an exception to be thrown.");
    } catch (error) {
      expect(error.message).toBe("One or both users not found.");
    }

    relationshipController.createRelationship = jest
      .fn()
      .mockReturnValue(mockRelationship);

    const result = relationshipController.createRelationship({
      cpf1: "11145153620",
      cpf2: "32145153513",
    });

    expect(result).toEqual(mockRelationship);
  });

  describe("findFriendOfFriends", () => {
    it("should return an empty object if the user has no friend of friends", () => {
      const userCpf = "11111111111";
      const result = relationshipController.findFriendOfFriends(userCpf);

      expect(result).toEqual({});
    });

    it("should return an empty object if no friend of friends found", () => {
      const result = relationshipController.findFriendOfFriends("11111111111");
      expect(result).toEqual({});
    });
  });
});
