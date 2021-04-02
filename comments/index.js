const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostID = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostID[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostID[req.params.id] || [];

  comments.push({ id, content });
  commentsByPostID[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("received event", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("listen on 4001");
});
