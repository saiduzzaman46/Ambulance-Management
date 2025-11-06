const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Oracle 10g XE + Node.js API is running 🚀");
});

// ✅ auth routes
app.use("/auth", authRoutes);

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
