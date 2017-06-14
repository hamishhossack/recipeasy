import httpStatus from 'http-status';

import Recipe from './recipe.model';
import helper from './recipe.helper';
import APIError from '../../helpers/APIError';

/**
 * [load load a single recipe onto the request]
 * @param  {[req]}   req  [the request object]
 * @param  {[res]}   res  [the response object]
 * @param  {Function} next [trigger following stream]
 * @param  {[string]}   id   [a matched id pattern]
 * @return {[Promise]}        [Move to the next destination]
 */
function load(req, res, next, id) {
  return Recipe.get(id).then((recipe) => {
    req.recipe = recipe; // eslint-disable-line no-param-reassign
    next();
  }).error(e => next(e));
}

/**
 * Get recipe
 * @returns {Recipe}
 */
function get(req, res) {
  return res.json(req.recipe);
}

/**
 * [list a list of recipes from root]
 * @param  {[req]}   req  [the request object]
 * @param  {[res]}   res  [the response object]
 * @param  {Function} next [trigger following stream]
 * @property {string} req.params.limit - Limit the items.
 * @property {string} req.params.offset - Offset the list position.
 * @return {Recipe[]}        [recipes in an array]
 */
function list(req, res, next) {
  const { limit, offset } = req.params;

  return Recipe.findAsync(null, null, { skip: offset || 0, limit: limit || 10 })
    .then(recipes => res.json(recipes))
    .error(next);
}

/**
 * Filter recipes by attribute
 * @property {string} req.params.query - The query string
 * @property {string} req.params.attribute - What to search on
 * @returns {Recipe[]}
 */
function filter(req, res, next) {
  req.query.attribute = req.query.attribute || 'name';

  const filterOptions = helper.getFilterOptions(req.query);

  if (!filterOptions) {
    return next(
      new APIError(
        'This filter option doesn\'t exist',
        httpStatus.NOT_FOUND
      )
    );
  }

  return Recipe.searchByAttribute(filterOptions)
    .then(filteredRecipes => res.json(filteredRecipes))
    .error(next);
}

/**
 * Increase existing recipe stars by 1
 * @returns {Recipe}
 */
function addToFavourites(req, res, next) {
  const recipe = req.recipe;

  if (recipe.favourite) {
    return next(
      new APIError(
        'This recipe is currently in favourites',
        httpStatus.BAD_REQUEST
      )
    );
  }

  recipe.set('favourite', true, { strict: true });
  recipe.save();

  return res.json(recipe);
}

/**
 * Decrease existing recipe stars by 1
 * @returns {Recipe}
 */
function removeFromFavourites(req, res, next) {
  const recipe = req.recipe;

  if (!recipe.favourite) {
    return next(
      new APIError(
        'This recipe is currently not in favourites',
        httpStatus.BAD_REQUEST
      )
    );
  }

  recipe.set('favourite', false, { strict: true });
  recipe.save();

  return res.json(recipe);
}

export default {
  load,
  get,
  list,
  filter,
  addToFavourites,
  removeFromFavourites
};
