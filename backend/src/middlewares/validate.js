const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }
    next();
  };
};

module.exports = validate;
