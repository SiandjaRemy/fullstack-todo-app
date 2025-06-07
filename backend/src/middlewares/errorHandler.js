const errorHandling = (error, req, res, next) => {
  console.error("Error stack:", error.stack);

  res.status(error.status || 500).json({
    status: error.status || 500,
    message: "Something went wrong",
    error: error.message || "Internal Server Error",
  });
};

module.exports = errorHandling;
