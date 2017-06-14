import { Subject } from 'rxjs';

import RecipeService from '../recipes';

/**
 * Current Recipes Service
 */
export default class CurrentRecipeService {
  constructor() {
    this.page = 1;
    this.totalPages = 0;
    this.totalResults = 0;

    this._query = null;
    this._recipes = null;

    this.$recipes = new Subject();
    this.$searchQuery = new Subject();

    this.recipeService = new RecipeService();
  }

  /**
   * The current Search query getter
   * @param query
   */
  set searchQuery(query) {
    this._query = query;
    this.$searchQuery.next(query);
    this.search();
  }

  get searchQuery() {
    return this._query;
  }

  /**
   * Recipes in the current displayed list
   * @param Recipes
   */
  set recipes(recipes) {
    this._recipes = recipes;
    this.$recipes.next(recipes);
  }

  get recipes() {
    return this._recipes;
  }

  /**
   * Hydrate the current Recipes from a response
   * @param res
   */
  set hydrate(res) {
    this.recipes = res;
  }

  get hydrate() {
    return 'We only set the hydration';
  }

  /**
   * Find the next page of results
   */
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.search();
    }
  }

  /**
   * Find the next page of results
   */
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.search();
    }
  }

  /**
   * Search the recipe db for results
   */
  search() {
    this.recipeService.filterRecipes(this.searchQuery, 'name')
      .then(res => this.hydrate = res)
      .catch(console.error);
  }
}
