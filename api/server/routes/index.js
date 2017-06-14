import express from 'express';

import recipeRoutes from '../modules/recipe/recipe.router';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /healthz - Check service health */
router.get('/healthz', (req, res) =>
  res.send('OK')
);

/** Setup All /recipe routes **/
router.use('/recipes', recipeRoutes);

export default router;
