const express = require("express");
const router = express.Router();

const {
    getAllTasks, 
    createTasks,
    updateTask,
    deleteTask
} = require("../Controllers/tasks");

router.route("/")
    .get(getAllTasks)
    .post(createTasks)

router.route("/:id")
    .patch(updateTask)
    .delete(deleteTask)

module.exports = router;