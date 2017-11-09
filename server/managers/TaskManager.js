const TASKS_JSON = './server/tasks.json';

/**
 * Import the module (old way) and read the JSON file.
 */
const data = require('easyjson').path(TASKS_JSON);

/**
 * Every task has an ID.
 * The JSON file will store (taskCounter + 1) tasks.
 * The ID is given to each task when #add is called.
 */
let taskCounter = Object.keys(data.get('tasks')).length;

/**
 * Singleton-like task manager.
 */
const TaskManager = {

  /**
   * Returns an array with all of the tasks in which (task.startDate === date).
   * @param date - a string in the standard ISO format: "YYYY-MM-DD".
   * @see https://www.w3schools.com/jsref/jsref_obj_date.asp
   */
  loadTasksByDate(date) {
    const tasks = [];
    for (let i = 0; i < taskCounter; i++) {
      const task = data.get(`tasks[${i + 1}]`);
      const startDate = task.startDate;
      if (startDate === date) {
        tasks.push(task);
      }
    }
    return tasks;
  },

  /**
   * Adds a new task to the JSON file.
   * @param task - task object.
   */
  add(task) {
    const id = ++taskCounter;
    task.id = id;
    data.add(`tasks[${id}]`, task);
  },

  /**
   * Removes a given task object from the JSON file.
   * Assumes that the task is in the file...
   * @param task - task object.
   */
  remove(task) {
    const taskId = task.id;
    data.del(`tasks[${taskId}]`);
  },

  /**
   * Update a task's name.
   * @param task - task object.
   * @param newName - string.
   */
  updateName(task, newName) {
    const taskId = task.id;
    data.modify(`tasks[${taskId}][name]`, newName);
  },

  /**
   * Update a task's description.
   * @param task - task object.
   * @param newDescription - string.
   */
  updateDescription(task, newDescription) {
    const taskId = task.id;
    data.modify(`tasks[${taskId}][description]`, newDescription);
  },

  /**
   * Update a task's description.
   * @param task - task object.
   * @param newCategory - string.
   */
  updateCategory(task, newCategory) {
    const taskId = task.id;
    data.modify(`tasks[${taskId}][category]`, newCategory);
  }

  // TODO: Update Estimated Time?

}

export default TaskManager;
