import express from 'express';
import validate from 'express-validation';

import paramValidation from './recipe.validation';
import recipeCtrl from './recipe.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/recipe - Get recipes */
  .get(recipeCtrl.list);

router.route('/filter')
/** GET /api/recipe/filter - Get recipe by attribute & query */
  .get(validate(paramValidation.filter), recipeCtrl.filter);

router.route('/:recipeId')
  /** GET /api/recipe/:recipeId - Get recipe */
  .get(recipeCtrl.get);

router.route('/:recipeId/favourite')
  /** PUT /api/recipe/:recipeId/favourite - Add favourite recipe */
  .put(recipeCtrl.addToFavourites)
  /** DELETE /api/recipe/:recipeId/favourite - Remove favourite recipe */
  .delete(recipeCtrl.removeFromFavourites);

/** Load recipe when API with recipeId route parameter is hit */
router.param('recipeId', recipeCtrl.load);

export default router;
