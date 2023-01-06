const express = require("express");
const router = express.Router();

const {
    getAllTasks, 
    createTasks,
    updateTask
} = require("../Controllers/tasks");

router.route("/")
    .get(getAllTasks)
    .post(createTasks)

router.route("/:id")
    .patch(updateTask)

module.exports = router;