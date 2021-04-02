const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {});
app.post("/posts", (req, res) => {});

app.listen(4002, () => console.log("listen on 4002"));
