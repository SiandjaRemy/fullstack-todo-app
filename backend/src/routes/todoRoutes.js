const express = require("express");
const router = express.Router();

const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  patchTodo,
} = require("../controllers/todoControllers");

const validate = require("../middlewares/validate");
const {
  updateTodoSchema,
  createTodoSchema,
} = require("../validators/todoValidators");

// get all the todos
router.get("/", getAllTodos);

// create a todo
router.post("/", validate(createTodoSchema), createTodo);

// get a todo by id
router.get("/:id", getTodoById);

// update a todo by id
router.put("/:id", validate(updateTodoSchema), updateTodo);

// update todo completed value by id
router.patch("/:id", patchTodo);

// delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
