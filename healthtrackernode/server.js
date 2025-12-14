const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const createAccountRoute = require("./routes/createaccount");
const signInRoute = require("./routes/signin");
const updateProfileRoute = require("./routes/updateProfile");
const chatbotRoute = require("./routes/chatbot");
const rankRoute = require("./routes/rank");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", authRoute);

mongoose
  .connect("mongodb://localhost:27017/healthtracker")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

app.use("/api", createAccountRoute);
app.use("/api", signInRoute);
app.use("/api", updateProfileRoute);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/rank", rankRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
