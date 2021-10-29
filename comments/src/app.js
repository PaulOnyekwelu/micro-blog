const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

// in-memory storage
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  return res.json(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(5).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  if (!content) {
    return res.status(400).json({ message: "content field required" });
  }
  let comments = commentsByPostId[postId] || [];
  if (comments.length > 0) {
    const isExist = comments.filter((comment) => comment.content === content);
    if (isExist.length > 0) {
      return res.status(400).json({ message: "comment already exists" });
    }
  }
  comments = [...comments, { id, content, status: "pending" }];
  commentsByPostId[postId] = comments;

  try {
    // dispatching commentcreated event to other microservices
    await axios.post("http://event-bus-clusterip:4005/event", {
      type: "CommentCreated",
      data: {
        id,
        content,
        postId,
        status: "pending",
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  return res.json(comments);
});

app.post("/event", async (req, res) => {
  console.log("event received: ", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, content, status } = data;
    const comments = commentsByPostId[postId];
    const newComment = comments.map((comment) => {
      if (comment.id === id) {
        return {
          id,
          content,
          status,
        };
      }
      return comment;
    });
    commentsByPostId[postId] = newComment;

    try {
      await axios.post("http://event-bus-clusterip:4005/event", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          content,
          status,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return res.json({});
});

module.exports = app;
