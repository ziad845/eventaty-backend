require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ❌ شيل أي routes مؤقتًا
// const appRoutes = require("./src/routes/app.routes");
// app.use(appRoutes);

// ✅ test route
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});