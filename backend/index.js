require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require("./routes/auth.route");
const todoRouter = require("./routes/todo.route");
const app = express()

connectDB();

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter)

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Example app listening on port : http://localhost:${PORT}`)
})