const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const todoRoutes = require("./routes/todoRoutes");
const errorHandling = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed cors origin
const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// Database synchronization
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Models synchronized successfully.");
  })
  .catch((err) => {
    console.error("Failed to synchronized database:", err);
  });

app.use(express.json());

// Custom error handling middleware
app.use(errorHandling);

// Todo routes
app.use("/api/todos", todoRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Databalse connected"))
  .catch((err) => console.error("Connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
