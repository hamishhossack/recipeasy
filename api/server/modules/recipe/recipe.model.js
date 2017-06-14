import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';

/**
 * User Schema
 */
const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cookTime: Number,
  ingredients: [String],
  favourite: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
RecipeSchema.method({});

/**
 * Statics
 */
RecipeSchema.statics = {
  /**
   * Get recipe
   * @param {ObjectId} id - The objectId of recipe.
   * @returns {Promise<Recipe, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync().then((recipe) => {
        if (recipe) {
          return recipe;
        }

        const err = new APIError(
          'Sorry, no recipe exists with this id',
          httpStatus.NOT_FOUND
        );

        return Promise.reject(err);
      });
  },

  /**
   * Search recipes by query
   * @param {ObjectId} search.attribute - A search attribute
   * @param {ObjectId} search.query - A search query
   * @returns {Promise<Recipe[], APIError>}
   */
  searchByAttribute(search) {
    return this.findAsync(search)
      .then((recipes) => {
        if (recipes || recipes.length > 0) {
          return recipes;
        }

        const err = new APIError(
          'Sorry, nothing matched your filter term',
          httpStatus.NOT_FOUND
        );

        return Promise.reject(err);
      });
  },

};

/**
 * @typedef Recipe
 */
export default mongoose.model('recipes', RecipeSchema);
