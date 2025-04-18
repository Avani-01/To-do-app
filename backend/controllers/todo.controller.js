const Todo = require("../models/todo.model");

const getTodos = async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch todos', details: err.message });
    }
  }

const createTodo = async (req, res) => {
    try {
      const newTodo = new Todo(req.body);
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create todo', details: err.message });
    }
  }

const updateTodo = async (req, res) => {
    try {
      const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json({msg : "updated succsessfully"});
    } catch (err) {
      res.status(400).json({ error: 'Failed to update todo', details: err.message });
    }
  }

const deleteTodo = async (req, res) => {
    try {
      const deleted = await Todo.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json({ message: 'Todo deleted' });
    } catch (err) {
      res.status(400).json({ error: 'Failed to delete todo', details: err.message });
    }
  }

module.exports ={
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}