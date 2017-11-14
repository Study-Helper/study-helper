import React from 'react';

/* Import a whole lot of background colors. */
import { blue500, red500, amber400, greenA400, limeA400 } from 'material-ui/styles/colors';

/* Import a whole lot of icons. */
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ChangeHistory from 'material-ui/svg-icons/action/change-history';
import Dashboard from 'material-ui/svg-icons/action/dashboard';

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

  getCategoryIcon(category) {
    return categoryMap[category.title].icon;
  },

  getCategoryBackgroundColor(category) {
    return categoryMap[category.title].backgroundColor;
  }
}

/** @private */
// TODO: Key = Component name
// When a new category is added, check the map by map[key]
const categoryMap = {
  Sport: {
    icon: <ActionAssignment />,
    backgroundColor: blue500
  },
  Note: {
    icon: <EditorInsertChart />,
    backgroundColor: red500
  },
  Exam: {
    icon: <AssignmentTurnedIn />,
    backgroundColor: amber400
  },
  Presentation: {
    icon: <ChangeHistory />,
    backgroundColor: greenA400
  },
  Email: {
    icon: <Dashboard />,
    backgroundColor: limeA400
  },
};

export default CategoryManager;
