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
 * Singleton-like task manager.
 */
const TaskManager = {

  // MARK: Task loads.

  /**
   * Returns an array with all of the tasks in which (task.startDate === date).
   * @param date - a string in the standard ISO format: "YYYY-MM-DD".
   * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
   */
  loadTasksByDate(date) {
    const tasks = [];
    const taskKeys = Object.keys(data.get('todo_tasks'));
    taskKeys.forEach(function(key) {
      const task = data.get(`todo_tasks[${key}]`);
      const startDate = task.startDate;
      if (startDate === date) {
        tasks.push(task);
      }
    });
    return tasks;
  },

  loadStoredCompletedTasks() {
    const tasks = [];
    const taskKeys = Object.keys(data.get('completed_tasks'));
    taskKeys.forEach(function(key) {
      const task = data.get(`completed_tasks[${key}]`);
      tasks.push(task);
    });
    return tasks;
  },

  loadStoredDeletedTasks() {
    const tasks = [];
    const taskKeys = Object.keys(data.get('deleted_tasks'));
    taskKeys.forEach(function(key) {
      const task = data.get(`deleted_tasks[${key}]`);
      tasks.push(task);
    });
    return tasks;
  },

  // MARK: CRUD task operations.

  /**
   * Adds a new task to the JSON file.
   * NOTE: If the task has an ID, then it's a task that was removed, and
   * we're undoing that action.
   * @param task - task object.
   */
  add(task) {
    const id = task.id || generateRandomId();
    task.id = id;
    data.add(`todo_tasks[${id}]`, task);
  },

  /**
   * Removes a given task object from the JSON file.
   * Assumes that the task is in the file...
   * @param task - task object.
   */
  remove(task) {
    const id = task.id;
    data.del(`todo_tasks[${id}]`);
  },

  /**
   * Update a task's name.
   * @param task - task object.
   * @param newName - string.
   */
  updateName(task, newName) {
    const id = task.id;
    data.modify(`todo_tasks[${id}][name]`, newName);
  },

  /**
   * Update a task's description.
   * @param task - task object.
   * @param newDescription - string.
   */
  updateDescription(task, newDescription) {
    const id = task.id;
    data.modify(`todo_tasks[${id}][description]`, newDescription);
  },

  /**
   * Update a task's description.
   * @param task - task object.
   * @param newCategory - string.
   */
  updateCategory(task, newCategory) {
    const id = task.id;
    data.modify(`todo_tasks[${id}][category]`, newCategory);
  },

  // MARK: Task-History.

  checkTask(task) {
    const id = task.id;
    data.del(`todo_tasks[${id}]`);
    data.add(`completed_tasks[${id}]`, task);
  }
}

export default TaskManager;
