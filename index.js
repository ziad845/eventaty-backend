require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const expressMongoSanitize = require("express-mongo-sanitize");

let appRoutes;

try {
  appRoutes = require("./src/routes/app.routes");
} catch (err) {
  console.error("❌ Error loading routes:", err);
}

const connectDB = require("./DB");
const { AppError } = require("./src/utils/AppError");
const globalErrorHandler = require("./src/controllers/error.controller");

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

// Static files
app.use("/uploads", express.static("src/uploads"));

// ✅ Root route (مهم جدًا)
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ استخدم routes بس لو شغالة
if (appRoutes) {
  app.use("/", appRoutes);
}

// 404 Handler
app.use((req, res, next) => {
  next(
    new AppError(
      "NotFoundError",
      "Page not found",
      "the page you are looking for does not exist",
      404
    )
  );
});

// Global Error Handler
app.use(globalErrorHandler);

// --- Server ---
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server Error:", error);
    process.exit(1);
  }
};

startServer();