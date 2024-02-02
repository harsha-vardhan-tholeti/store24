const express = require("express");

const app = express();

app.use(express.json());

// Route Imports
const ProductRouter = require("./routes/productRoutes");

// Routes
app.use("/api/v1/products", ProductRouter);

module.exports = app;
