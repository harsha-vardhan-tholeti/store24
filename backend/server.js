const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Config
dotenv.config({ path: "backend/config/.env" });

// Connecting to database
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
