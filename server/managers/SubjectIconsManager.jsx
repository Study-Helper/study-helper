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
import Physics from 'material-ui/svg-icons/places/all-inclusive';
import Maths from 'material-ui/svg-icons/editor/functions';
import Arts from 'material-ui/svg-icons/image/palette';
import Finances from 'material-ui/svg-icons/action/trending-up';
import Economy from 'material-ui/svg-icons/action/account-balance';
import Languages from 'material-ui/svg-icons/action/record-voice-over';
import Globe from 'material-ui/svg-icons/social/public';
import People from 'material-ui/svg-icons/social/people';

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
const SubjectIconsManager = {

  getAllIcons(){
    return subjectIconsMap;
  },

  getSubjectIconFromString(iconName) {
    return subjectIconsMap[iconName].icon;
  },

  getSubjectBackgroundColorFromString(iconName) {
    return subjectIconsMap[iconName].backgroundColor;
  }
}

const subjectIconsMap = {
  Maths: {
    icon: <Maths />,
    backgroundColor: blue500
  },
  Physics: {
    icon: <Physics />,
    backgroundColor: redA200
  },
  Arts: {
    icon: <Arts />,
    backgroundColor: amber400
  },
  Economy: {
    icon: <Economy />,
    backgroundColor: greenA700
  },
  Social: {
    icon: <People />,
    backgroundColor: cyan500
  },
  Finances: {
    icon: <Finances />,
    backgroundColor: red400
  },
  Languages: {
    icon: <Languages />,
    backgroundColor: blueA200
  },
  Geography: {
    icon: <Globe />,
    backgroundColor: pink300
  }
};

export default SubjectIconsManager;
