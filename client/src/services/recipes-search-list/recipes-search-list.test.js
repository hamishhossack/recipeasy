import CurrentRecipeService from './index';
import mockRecipes from '../../__tests__/mocks/mock-recipes.mock';
import mockSearchResponse from '../../__tests__/mocks/mock-search-response.mock';

let service;

describe('CurrentRecipesService', () => {
  beforeEach(() => {
    service = new CurrentRecipeService();
  });

  describe('Sanity check', () => {
    it('should have an empty query', () => {
      expect(service._query).toBeNull();
    });

    it('should have no recipes', () => {
      expect(service._recipes).toBeNull();
    });
  });

  describe('Hydrate', () => {
    it('should add results', () => {
      service.hydrate = mockSearchResponse;
      expect(service._recipes).toEqual(mockRecipes);
    });
  });

  describe('Query', () => {
    it('should hear the search query update', () => {
      const searchQuery = 'testing';

      service.$searchQuery.subscribe((resultQuery) => {
        expect(resultQuery).toEqual(searchQuery);
      });

      service.query = searchQuery;
    });
  });

  describe('Recipes', () => {
    it('should hear the recipes update', () => {
      service.$recipes.subscribe((resultRecipes) => {
        expect(resultRecipes).toEqual(mockRecipes);
        expect(resultRecipes.length).toEqual(mockRecipes.length);
        expect(resultRecipes[0].name).toBeTruthy();
        expect(resultRecipes[0].name).toEqual(mockRecipes[0].name);
      });

      service.recipes = mockRecipes;
    });
  });
});
