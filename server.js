const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

const io = require("socket.io")(server);
// Assign socket object to every request
app.use(function (req, res, next) {
    req.io = io;
    next();
});
  
connectDB();


app.use(morgan("dev"));
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/auth", require("./router/api/auth"));
app.use("/api/social", require("./router/api/social"));
app.use("/api/messages", require("./router/api/messages"));