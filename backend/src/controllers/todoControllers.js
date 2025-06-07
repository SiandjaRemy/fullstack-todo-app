const Todos = require("../models/todoModel");

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const createTodo = async (req, res, next) => {
  const { title, description, completed } = req.body;
  try {
    const newTodo = await Todos.create({ title, description, completed });
    handleResponse(res, 201, "Todo created succesfully", newTodo);
  } catch (error) {
    console.log("req", req);
    next(error);
  }
};

const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todos.findAll();
    handleResponse(res, 200, "Todos fetched succesfully", todos);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todos.findByPk(id);
    if (!todo) return handleResponse(res, 404, "Todo not found");
    handleResponse(res, 200, "Todo fetched succesfully", todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  const id = req.params.id;
  const { title, description } = req.body;
  try {
    const updatedTodo = await Todos.findByPk(id);
    if (!updatedTodo) return handleResponse(response, 404, "Todo not found");

    updatedTodo.title = title ?? updatedTodo.title;
    updatedTodo.description = description ?? updatedTodo.description;
    await updatedTodo.save();
    handleResponse(res, 200, "Todo updated succesfully", updatedTodo);
  } catch (error) {
    console.log("req", req);
    next(error);
  }
};

const patchTodo = async (req, res, next) => {
  const id = req.params.id;
  const { completed } = req.body;
  try {
    const updatedTodo = await Todos.findByPk(id);
    if (!updatedTodo) return handleResponse(response, 404, "Todo not found");

    updatedTodo.completed = completed ?? updatedTodo.completed;
    await updatedTodo.save();
    handleResponse(res, 200, "Todo updated succesfully", updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedTodo = await Todos.findByPk(id);
    if (!deletedTodo) return handleResponse(response, 404, "Todo not found");

    await deletedTodo.destroy();
    handleResponse(res, 200, "Todo deleted succesfully", deletedTodo);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  patchTodo,
  deleteTodo,
};
