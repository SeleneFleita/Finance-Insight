const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3003;

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res)=> {
    res.send("servidor funcionando")
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))