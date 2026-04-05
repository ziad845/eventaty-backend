require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const expressMongoSanitize = require("express-mongo-sanitize");

const app = express();

// --- Middlewares ---
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors());
app.use(express.json());
app.use(expressMongoSanitize());

// ✅ route رئيسي علشان Railway
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// ❌ متشغلش routes دلوقتي
// const appRoutes = require("./src/routes/app.routes");
// app.use(appRoutes);

// --- Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});