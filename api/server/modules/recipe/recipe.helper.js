/**
 * [filterByIngredients simple match in array]
 * @param  {[string]} search [search query parameter]
 * @return {[array]}        [mongoose find query]
 */
function filterByIngredients(query) {
  return { ingredients: query };
}

/**
 * [filterByMaxCookTime less than or equal cooking time]
 * @param  {[string]} search [search query parameter]
 * @return {[array]}        [mongoose find query]
 */
function filterByMaxCookTime(query) {
  return { cookTime: { $lte: query } };
}

/**
 * [filterByPartialNameMatch regex partial match on name]
 * @param  {[string]} search [search query parameter]
 * @return {[array]}        [mongoose find query]
 */
function filterByPartialNameMatch(query) {
  return { name: { $regex: query, $options: 'i' } };
}

/**
 * [getFilterOptions select the filter type by attribute]
 * @param  {[array]} search [search parameters]
 * @return {[array]}        [mongoose find query]
 */
function getFilterOptions(search) {
  switch (search.attribute) {
  case 'name':
    return filterByPartialNameMatch(search.query);
  case 'ingredients':
    return filterByIngredients(search.query);
  case 'maxCookTime':
    return filterByMaxCookTime(search.query);
  default:
    return false;
  }
}

export default {
  getFilterOptions,
};
