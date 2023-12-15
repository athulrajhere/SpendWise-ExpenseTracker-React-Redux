const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const IncomeSchema = require("./models/IncomeModel"); 

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

app.use(errorHandler);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
};

server();
