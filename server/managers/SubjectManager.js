import SubjectIconsManager from './SubjectIconsManager.jsx';

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

  add(subject, location){
    const id = subject.id || generateRandomId();
    const color = subject.color || SubjectIconsManager.getSubjectBackgroundColorFromString(subject.image);
    subject.id = id;
    subject.color = color;
    data.add(`${location}[${id}]`, subject);
  },

  remove(subject, location){
    const id = subject.id;
    data.del(`${location}[${id}]`);
  },

  updateName(subject, newName, location) {
    const id = subject.id;
    data.modify(`${location}[${id}][name]`, newName);
  },

  updateImage(subject, newImage, location){
    const id = subject.id;
    data.modify(`${location}[${id}][image]`, newImage);
  },

  addTest(subject, newName, newGrade){
    const id = subject.id;
    const testId = generateRandomId();
    const test = {
      "id": testId,
      "name": newName,
      "grade": parseFloat(newGrade)
    };
    subject.tests[testId] = test;
    subject.mean = this.calcNewMean(subject);
    data.modify(`${"subjects"}[${id}]`, subject);
  },

  getAllTests(subject){
    const tests = [];
    for(let key in subject.tests){
      let test = subject.tests[key];
      tests.push(test);
    }
    return tests;
  },

  calcNewMean(subject){
    const allTests = this.getAllTests(subject);
    let newMean = 0;
    allTests.map((test, index)=>{
      newMean+=test.grade;
    });
    newMean = newMean/(allTests.length);
    return newMean;
  }
}

export default SubjectManager;
