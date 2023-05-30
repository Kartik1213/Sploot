require("./config/database").connect();
const express = require("express");
const app = express();
const profileRouter = require("./routes/profileRoutes");
const articleRouter = require("./routes/articleRoutes");

app.use(express.json());
app.use("/api", profileRouter);
app.use("/api", articleRouter);
 

 
module.exports = app;
