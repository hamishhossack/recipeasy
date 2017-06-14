import RecipeListComponent from './index';
import CurrentRecipeService from '../../services/recipes-search-list';
import currentListComponentTpl from './recipe-list.hbs';
import mockRecipes from '../../__tests__/mocks/mock-recipes.mock';

const currentRecipesService = new CurrentRecipeService();

let component;

describe('RecipeListComponent', () => {
  beforeEach(() => {
    component = new RecipeListComponent({ currentRecipesService });
  });

  describe('Sanity check', () => {
    it('should have a name recipe-list', () => {
      expect(component.name).toEqual('recipe-list');
    });

    it('should have a string template', () => {
      expect(component.tpl).toEqual(currentListComponentTpl);
    });
  });

  describe('Gallery', () => {
    beforeEach(() => {
      const el = document.createElement('recipe-list');
      document.body.appendChild(el);
    });

    // TODO(hamish) : Testing PhantomJS querySelector Functionality
    xit('should have be empty', () => {
      component.render();
      expect(document.querySelectorAll('.gallery-cell').length).toEqual(0);
    });

    xit('should show results', () => {
      component.context.recipes = mockRecipes;
      component.render();
      tick(1);
      expect(document.querySelectorAll('.gallery-cell').length).toEqual(mockRecipes.length);
    });

    xit('should click and add a selected item', () => {
      component.context.recipes = mockRecipes;
      component.render();

      const cell = document.querySelector('.gallery-cell');
      cell.click();

      expect(selectedRecipeService.recipe).toEqual(mockRecipes[0]);
    });
  });
});
