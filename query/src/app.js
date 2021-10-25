const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  return res.json(posts)
})

app.post("/event", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    posts[data.id] = {
      ...data,
      comments: [],
    };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    if (!posts[postId]) {
      return res.status(400).json({ message: "invalid post id" });
    }
    posts[postId].comments.push({ id, content });
  }

  console.log("event received: ", req.body.type);

  return res.json({});
});

module.exports = app;
