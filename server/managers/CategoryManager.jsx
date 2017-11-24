import React from 'react';

/* Import a whole lot of background colors. */
// TODO: All 300 or 200 or whatever.
import {
  blue500,
  redA200,
  amber400,
  greenA700,
  cyan500,
  blueA200,
  red400,
  pink300
} from 'material-ui/styles/colors';

/* Import a whole lot of icons. */
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import AssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ChangeHistory from 'material-ui/svg-icons/action/change-history';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Message from 'material-ui/svg-icons/communication/message';
import Headset from 'material-ui/svg-icons/hardware/headset';
import Idk from 'material-ui/svg-icons/image/adjust';

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

  loadFakeCategories() {
    const fakeCategories = [];
    const keys = Object.keys(categoryMap);
    keys.forEach(function(key) {
      fakeCategories.push({ title: key });
    });
    return fakeCategories;
  },

  loadCategoryByName(categoryTitle) {
    const categories = this.loadCategories();
    return categories.find(category => category.title === categoryTitle);
  },

  getCategoryIcon(category) {
    // console.log('category received', category);
    if( !categoryMap[category.title] ) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>> thisssss', category);
    }
    return categoryMap[category.title].icon;
  },

  getCategoryIconFromString(categoryString) {
    return categoryMap[categoryString].icon;
  },

  getCategoryBackgroundColor(category) {
    return categoryMap[category.title].backgroundColor;
  },

  getCategoryBackgroundColorFromString(categoryString) {
    return categoryMap[categoryString].backgroundColor;
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
    backgroundColor: redA200
  },
  Exam: {
    icon: <AssignmentTurnedIn />,
    backgroundColor: amber400
  },
  Presentation: {
    icon: <ChangeHistory />,
    backgroundColor: greenA700
  },
  Email: {
    icon: <Dashboard />,
    backgroundColor: cyan500
  },
  Studying: {
    icon: <Message />,
    backgroundColor: red400
  },
  Friends: {
    icon: <Headset />,
    backgroundColor: blueA200
  },
  Family: {
    icon: <Idk />,
    backgroundColor: pink300
  }
};

export default CategoryManager;
