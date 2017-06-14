import Joi from 'joi';

export default {
  // GET /api/recipe/filter
  filter: {
    query: {
      query: Joi.string().required(),
      attribute: Joi.string(),
    }
  }
};
