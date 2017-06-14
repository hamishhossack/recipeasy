import request from '../../helpers/request';

/**
 * Recipes Service
 */
export default class RecipeService {
  constructor() {
    this.apiUrl = 'http://localhost:3001/api';
  }

  /**
   * [getRecipeList A list of recipes]
   * @return {[recipe[]]} [array of recipes]
   */
  getRecipeList() {
    return request({
      method: 'GET',
      url: `${this.apiUrl}/recipes`,
    })
      .catch(err => console.debug(err));
  }

  /**
   * [getRecipeById description]
   * @param  {[string]} recipeId [recipe key identifier]
   * @return {[recipe[]]}    [array of recipes]
   */
  getRecipeById(recipeId) {
    return request({
      method: 'GET',
      url: `${this.apiUrl}/recipes/${recipeId}`,
    })
      .catch(err => console.debug(err));
  }

  /**
   * [filterRecipes A filtered list of recipes]
   * @param  {[string]} query     [the filter string match]
   * @param  {[string]} attribute [the attribute to be filtered on]
   * @return {[recipe[]]}           [array of recipes]
   */
  filterRecipes(query, attribute) {
    return request({
      method: 'GET',
      url: `${this.apiUrl}/recipes/filter?query=${query}&attribute=${attribute}`
    })
      .catch(err => console.debug(err));
  }

  /**
   * [favouriteRecipe Add recipe to favourites]
   * @param  {[string]} recipeId [key identifier for a recipe]
   * @return {[recipe]}          [the updated recipe]
   */
  favouriteRecipe(recipeId) {
    return request({
      method: 'PUT',
      url: `${this.apiUrl}/recipes/${recipeId}`,
    })
      .catch(err => console.debug(err));
  }

  /**
   * [removeFavouriteRecipe Remove recipe from favourites]
   * @param  {[string]} recipeId [key identifier for a recipe]
   * @return {[recipe]}          [the updated recipe]
   */
  removeFavouriteRecipe(recipeId) {
    return request({
      method: 'DELETE',
      url: `${this.apiUrl}/recipes/${recipeId}`,
    })
      .catch(err => console.debug(err));
  }
}
