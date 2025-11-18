const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask, filterByDate, searchByName } = require('../controller/taskController');
const router = express.Router();

router.post('/', createTask);

// Read all
router.get('/', getAllTasks);

// Update
router.put('/:id', updateTask);

// Delete
router.delete('/:id', deleteTask);

// Filter by date
router.get('/filter/date', filterByDate);

// Search by name
router.get('/search/name', searchByName);

module.exports = router;
