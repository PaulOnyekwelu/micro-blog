const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const eventHandler = (type, data) => {
  if (type === "PostCreated") {
    posts[data.id] = {
      ...data,
      comments: [],
    };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const comments = posts[postId].comments;
    const newComments = comments.map((comment) => {
      if (comment.id === id) {
        return { id, content, status };
      }
      return comment;
    });
    posts[postId].comments = newComments;
  }
};

const initEvent = async () => {
  try {
    const events = await axios.get("http://event-bus-clusterip:4005/event");
    for (let event of events.data.events) {
      eventHandler(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

app.get("/query/posts", (req, res) => {
  return res.json(posts);
});

app.post("/event", (req, res) => {
  const { type, data } = req.body;
  eventHandler(type, data);

  console.log("event received: ", req.body.type);

  return res.json({});
});

module.exports = { app, initEvent };
