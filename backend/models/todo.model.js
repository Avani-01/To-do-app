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
      },
      userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true 
      } // Link to User

});

module.exports = mongoose.model('Todo', UserSchema)