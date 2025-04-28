const Todo = require("../models/todo.model");

// const getTodos = async (req, res) => {
//     try {
//       const todos = await Todo.find();
//       res.json(todos);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch todos', details: err.message });
//     }
//   }
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }); // find only user's todos
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

// const createTodo = async (req, res) => {
//     try {
//       const newTodo = new Todo(req.body);
//       const savedTodo = await newTodo.save();
//       res.status(201).json(savedTodo);
//     } catch (err) {
//       res.status(400).json({ error: 'Failed to create todo', details: err.message });
//     }
//   }
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    
    const newTodo = new Todo({
      title,
      userId: req.user._id // <- From auth middleware
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

// const updateTodo = async (req, res) => {
//     try {
//       const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!updated) {
//         return res.status(404).json({ error: 'Todo not found' });
//       }
//       res.json({msg : "updated succsessfully"});
//     } catch (err) {
//       res.status(400).json({ error: 'Failed to update todo', details: err.message });
//     }
//   }

const updateTodo = async (req, res) => {
  try {
    // Find the todo by ID and check if it belongs to the logged-in user
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Check if the todo belongs to the logged-in user
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Proceed to update the todo
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Todo updated successfully', updated });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update todo', details: err.message });
  }
}

// const deleteTodo = async (req, res) => {
//     try {
//       const deleted = await Todo.findByIdAndDelete(req.params.id);
//       if (!deleted) {
//         return res.status(404).json({ error: 'Todo not found' });
//       }
//       res.json({ message: 'Todo deleted' });
//     } catch (err) {
//       res.status(400).json({ error: 'Failed to delete todo', details: err.message });
//     }
//   }

const deleteTodo = async (req, res) => {
  try {
    // Find the todo by ID and check if it belongs to the logged-in user
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Check if the todo belongs to the logged-in user
    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Proceed to delete the todo
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
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