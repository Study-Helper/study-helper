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
   * NOTE: If the task has an ID, either:
   * - It's a task that was removed, and we're undoing that action.
   * - Or we're adding it to some list in the history.
   * @param task - task object.
   * @param taskLocation - String: 'todo_tasks', 'missed_tasks' or 'deleted_tasks'.
   */
  add(task, taskLocation) {
    const id = task.id || generateRandomId();
    task.id = id;
    data.add(`${taskLocation}[${id}]`, task);
  },

  /**
   * Removes a given task object from todo_tasks.
   * This task will, however, be stored in removed_tasks.
   * Assumes that the task is in the file...
   * @param task - task object.
   * @param taskLocation - String: 'todo_tasks', 'missed_tasks' or 'deleted_tasks'.
   */
  remove(task, taskLocation) {
    const id = task.id;
    data.del(`${taskLocation}[${id}]`);
  },

  /**
   * Update a task's name.
   * @param task - task object.
   * @param newName - string.
   * @param taskLocation - String: 'todo_tasks', 'missed_tasks' or 'deleted_tasks'.
   */
  updateName(task, newName, taskLocation) {
    const id = task.id;
    data.modify(`${taskLocation}[${id}][name]`, newName);
  },

  /**
   * Update a task's description.
   * @param task - task object.
   * @param newDescription - string.
   * @param taskLocation - String: 'todo_tasks', 'missed_tasks' or 'deleted_tasks'.
   */
  updateDescription(task, newDescription, taskLocation) {
    const id = task.id;
    data.modify(`${taskLocation}[${id}][description]`, newDescription);
  },

  /**
   * Update a task's description.
   * @param task - task object.
   * @param newCategory - string.
   * @param taskLocation - String: 'todo_tasks', 'missed_tasks' or 'deleted_tasks'.
   */
  updateCategory(task, newCategory, taskLocation) {
    const id = task.id;
    data.modify(`${taskLocation}[${id}][category]`, newCategory);
  },

  // MARK: Task-History.

  checkTask(task) {
    const id = task.id;
    data.del(`todo_tasks[${id}]`);
    data.add(`completed_tasks[${id}]`, task);
  },

  // MARK: Utilities.

  /**
   * Turns something like 03:20 into '3 hours, 20 minutes'.
   */
  prettifyEstimatedDuration(task) {
    const duration = task.estimatedDuration;
    const [hours, minutes] = duration.split(':');
    const hoursAsInt = parseInt(hours);
    const minutesAsInt = parseInt(minutes);
    const hoursText = !hoursAsInt ? '' : hoursAsInt > 1 ? `${hoursAsInt} hours, ` : `${hoursAsInt} hour, `;
    const minutesText = !minutesAsInt ? '' : minutesAsInt > 1 ? `${minutesAsInt} minutes` : `${minutesAsInt} minute`;
    return hoursText + minutesText;
  },

  // MARK: Sorting.

  /** @private */
  sortTasksByNew(tasks) {
    return this.loadTasksByDate(tasks[0].startDate);
  },

  /** @private */
  sortTasksByCategory(tasks) {
    return tasks.sort((task1, task2) => task1.category > task2.category);
  },

  /** @private */
  sortTasksByDuration(tasks, duration) {
    return tasks.sort((task1, task2) => task1.estimatedDuration < task2.estimatedDuration);
  },

  sortTasksBy(tasks, value) {
    switch (value) {
      case "New": return this.sortTasksByNew(tasks);
      case "Category": return this.sortTasksByCategory(tasks);
      case "Duration": return this.sortTasksByDuration(tasks);
      default: return;
    }
  }
}

export default TaskManager;
