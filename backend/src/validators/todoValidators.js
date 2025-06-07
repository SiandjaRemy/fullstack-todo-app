const Joi = require("joi");

const createTodoSchema = Joi.object({
  title: Joi.string().min(5).required(),
  description: Joi.string(),
  completed: Joi.boolean(),
});

const updateTodoSchema = Joi.object({
  title: Joi.string().min(5),
  description: Joi.string(),
  completed: Joi.boolean(),
}).min(1);

module.exports = { createTodoSchema, updateTodoSchema };
