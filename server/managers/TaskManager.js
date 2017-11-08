const TASKS_JSON = './server/tasks.json';

const data = require('easyjson').path(TASKS_JSON);

/** Both the read and write operations are synchronous! **/

const TaskManager = {

  /**
   * Adds a new task to the JSON file.
   * @param task - task object.
   */
  add(task) {
    const id = task.id;
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
