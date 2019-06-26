const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/apiproject", {
  useNewUrlParser: true
});

const app = express();
app.use(helmet());

//Routes
const users = require("./routes/users");
const cars = require("./routes/cars");

//Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

//Routes
app.use("/users", users);
app.use("/cars", cars);

//Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  //Respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });
  //Respond to ourselves
  console.error(err);
});

//Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
