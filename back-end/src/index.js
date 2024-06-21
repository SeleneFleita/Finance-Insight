const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users")