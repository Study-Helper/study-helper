import React from 'react';

/* Import a whole lot of background colors. */
// TODO: All 300 or 200 or whatever.
import {
  blue500,
  grey500,
  green500,
  red500,
  deepPurple500,
  cyan500,
  lime500,
  amber500,
  brown500,
  deepOrange500,
  teal500,
  pink500
} from 'material-ui/styles/colors';

/* Import a whole lot of icons. */
import Shopping from 'material-ui/svg-icons/action/shopping-cart';
import Cake from 'material-ui/svg-icons/social/cake';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Home from 'material-ui/svg-icons/action/home';
import Outdoors from 'material-ui/svg-icons/image/nature-people';
import Lunch from 'material-ui/svg-icons/maps/local-dining';
import Event from 'material-ui/svg-icons/action/today';
import Presentation from 'material-ui/svg-icons/action/record-voice-over';
import Book from 'material-ui/svg-icons/action/book';
import Mail from 'material-ui/svg-icons/maps/local-post-office';
import Sport from 'material-ui/svg-icons/places/fitness-center';
import Note from 'material-ui/svg-icons/action/announcement';


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
    icon: <Sport/>,
    backgroundColor: grey500
  },
  Note: {
    icon: <Note/>,
    backgroundColor: blue500
  },
  Lunch: {
    icon: <Lunch/>,
    backgroundColor: amber500
  },
  Presentation: {
    icon: <Presentation/>,
    backgroundColor: deepPurple500
  },
  Email: {
    icon: <Mail/>,
    backgroundColor: teal500
  },
  Studying: {
    icon: <Book/>,
    backgroundColor: brown500
  },
  Event: {
    icon: <Event/>,
    backgroundColor: red500
  },
  Outdoors: {
    icon: <Outdoors/>,
    backgroundColor: green500
  },
  Shopping: {
    icon: <Shopping/>,
    backgroundColor: deepOrange500
  },
  Home: {
    icon: <Home/>,
    backgroundColor: pink500
  },
  Exam: {
    icon: <ContentPaste/>,
    backgroundColor: cyan500
  },
  Birthday: {
    icon: <Cake/>,
    backgroundColor: lime500
  }
};

export default CategoryManager;
