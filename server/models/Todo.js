const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false,
    },
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
