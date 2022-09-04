const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const userRouter = require("./routes/userRoutes");
const morgan = require("morgan");

// .env variables
require("dotenv").config();

// mysql connection
require("./config/mysqlConnection");

// app instance , httpserver & io
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//express middelwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server listing on port 
server.listen(process.env.PORT || 5000);
server.on("listening", () => {
  console.log(`listening on port ${process.env.PORT} `);
});

// socket on connection events
io.on("connection", (socket) => {
  console.log('user connected',socket.id);
});

//Routes
app.use("/user", userRouter);

//error handler
app.use((err, req, res, next) => {
  console.log(err.statusCode);
  res
    .status(err.statusCode)
    .send({
      status: err.statusCode,
      message: err.message,
      errors: err.errors || [],
    })
    
});
