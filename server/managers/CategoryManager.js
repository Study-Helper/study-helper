const DATA_JSON = './server/data.json';

/**
 * Import the module (old way) and read the JSON file.
 */
const data = require('easyjson').path(DATA_JSON);

/**
 * Generate and return a random id.
 * @private
 * @return generated id, a String.
 * @see taken from https://gist.github.com/gordonbrander/2230317
 */
function generateRandomId() {
  return '_' + Math.random().toString(36).substr(2, 12);
}

/**
 * Singleton-like categories manager.
 */
const CategoryManager = {

  loadCategories() {
    const categories = [];
    const keys = Object.keys(data.get('categories'));
    keys.forEach(function(key) {
      const category = data.get(`categories[${key}]`);
      categories.push(category);
    });
    return categories;
  },

}

export default CategoryManager;