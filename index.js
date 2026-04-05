require("dotenv").config(); // لازم أول سطر

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const expressMongoSanitize = require("express-mongo-sanitize");

// ❌ شيلنا MongoDB مؤقتًا
// const connectDB = require("./DB");

const app = express();

// --- Security & Middlewares ---
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors());
app.use(express.json());
app.use(expressMongoSanitize());

// ✅ Route تجريبي علشان Railway
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// --- Server ---
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // ❌ وقفنا الاتصال بقاعدة البيانات مؤقتًا
    // await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();