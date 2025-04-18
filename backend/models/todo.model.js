const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
    completed: {
        type: Boolean,
        default: false
      }

});

module.exports = mongoose.model('Todo', UserSchema)