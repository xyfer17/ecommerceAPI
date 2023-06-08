const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/users");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use("/api/users", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("sever started");
});
