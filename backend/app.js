const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const cookieParser = require('cookie-parser');

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

app.use(errorHandler);

const server = async () => {
  try {
    await db();
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error("Failed to start the server:", err);
});
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

server();
