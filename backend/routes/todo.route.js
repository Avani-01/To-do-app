const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');
const router = express.Router();
const auth = require('../middleware/auth')


router.get('/get', auth, getTodos );
router.post('/add', auth, createTodo);
router.put('/:id', auth, updateTodo)
router.delete('/:id', auth, deleteTodo)

module.exports= router