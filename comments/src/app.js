const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(express.json());

// in-memory storage
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  return res.json(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const id = randomBytes(5).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  if (!content) {
    return res.status(400).json({ message: "content field required" });
  }
  let comments = commentsByPostId[postId] || [];
  if (comments.length > 0) {
    const isExist = comments.filter((comment) => comment.content === content);
    if (isExist) {
      return res.status(400).json({ message: "comment already exists" });
    }
  }
  comments = [...comments, { id, content }];
  commentsByPostId[postId] = comments;
  return res.json(comments);
});

module.exports = app;
