const { Router } = require("express");

const Task = require("../models/task");

const router = Router();

// Get tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});

// Add task
router.post("/", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
    });
    res.status(201).json(task);
    await task.save();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});

// Change task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.done = req.body.done;
    await task.save();
    res.status(204).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.status(204).json({});
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
