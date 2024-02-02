const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

// Route Imports
const ProductRouter = require("./routes/productRoutes");
const UserRouter = require("./routes/userRoutes");

// Routes
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", UserRouter);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
