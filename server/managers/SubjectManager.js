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
 * Singleton-like subject manager.
 */
const SubjectManager = {
  loadSubjects() {
    const subjects = [];
    const subjectKeys = Object.keys(data.get('subjects'));
    subjectKeys.forEach(function(key) {
      const subject = data.get(`subjects[${key}]`);
      subjects.push(subject);
    });
    return subjects;
  },
}

export default SubjectManager;
