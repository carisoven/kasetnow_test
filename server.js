const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
 const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(morgan('dev'));
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/auth", require("./router/api/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server Started on port ${PORT}`));