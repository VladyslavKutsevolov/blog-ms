const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostID = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostID[req.params.id || []]);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostID[req.params.id] || [];

  comments.push({ id, content });

  commentsByPostID[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("listen on 4001");
});
