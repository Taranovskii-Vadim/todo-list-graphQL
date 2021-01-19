const Task = require("../models/task");

module.exports = {
  async getTasks() {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (e) {
      throw new Error(e);
    }
  },
  async addTask({ title }) {
    try {
      const task = new Task({ title });
      await task.save();
      return task;
    } catch (e) {
      throw new Error(e);
    }
  },
  async finishTask({ id, done }) {
    try {
      const task = await Task.findById(id);
      task.done = done;
      await task.save();
    } catch (e) {
      throw new Error(e);
    }
  },
  async removeTask({ id }) {
    try {
      await Task.findByIdAndRemove(id);
    } catch (e) {
      throw new Error(e);
    }
  },
};
