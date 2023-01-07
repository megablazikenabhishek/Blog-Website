const mongoose = require("mongoose");
const format = require("date-format");

const TasksSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    author_id:{
        type: String,
    },
    body: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [200, "Name cannot be more than 20 characters"]
    },
    date: { type: String, default: format.asString("at dd/MM/yyyy on hh:mm", new Date()) },
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