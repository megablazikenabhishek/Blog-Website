const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    body: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [120, "Name cannot be more than 20 characters"]
    },
    date: { type: Date, default: Date.now },
    meta: {
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model("Tasks", TasksSchema);