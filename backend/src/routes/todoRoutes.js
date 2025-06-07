const express = require("express");
const router = express.Router();

const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  patchTodo,
} = require("../controller/todoController");

// get all the todos
router.get("/", getAllTodos);

// create a todo
router.post("/", createTodo);

// get a todo by id
router.get("/:id", getTodoById);

// update a todo by id
router.put("/:id", updateTodo);

// update todo completed value by id
router.patch("/:id", patchTodo);

// delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
