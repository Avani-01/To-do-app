const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller');

const router = express.Router()

router.get('/get',getTodos );
router.post('/add', createTodo);
router.put('/:id',updateTodo)
router.delete('/:id',deleteTodo)

module.exports= router