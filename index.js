require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const expressMongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./DB");

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors());
app.use(express.json());
app.use(expressMongoSanitize());

// test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();