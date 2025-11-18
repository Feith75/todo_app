const Task = require("../models/taskModel");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await Task.create({ title, description });
    res.status(201).json(task);

  } catch (err) {
    console.log("Error creating task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// READ ALL
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", task });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// FILTER BY DATE
exports.filterByDate = async (req, res) => {
  const { date } = req.query;

  const start = new Date(date);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const tasks = await Task.find({
    createdAt: { $gte: start, $lte: end }

  });

  res.json(tasks);
};

// SEARCH BY NAME
exports.searchByName = async (req, res) => {
  const { q } = req.query;

  const tasks = await Task.find({
    title: { $regex: q, $options: "i" } // changed from "name" → "title"
  });

  res.json(tasks);
};
