const express = require("express");

const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

// Route Imports
const ProductRouter = require("./routes/productRoutes");

// Routes
app.use("/api/v1/products", ProductRouter);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
