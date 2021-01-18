const { Router } = require("express");

const router = Router();

// Get tasks
router.get("/", (req, res) => {
  res.json({ test: "test" });
});

// Add task
router.post("/", (req, res) => {});

// Change task
router.put("/:id", (req, res) => {});

// Delete task
router.delete("/:id", (req, res) => {});

module.exports = router;
