const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// console.log(randomBytes, randomBytes(3).toString('hex'))

const app = express();
app.use(express.json());
app.use(cors());

// in-memory storage
const posts = {};

app.post("/posts", async (req, res) => {
  const id = randomBytes(5).toString("hex");
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title field is required" });
  }
  const isExist = Object.values(posts).filter((post) => post.title === title);
  if (isExist.length > 0) {
    return res.status(400).json({ message: "post already exist" });
  }
  posts[id] = {
    id,
    title,
  };

  const resp = await axios.post("http://localhost:4005/event", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  return res.json(posts[id]);
});

app.get("/posts", (req, res) => {
  return res.json(posts);
});

app.post("/event", (req, res) => {
  console.log("event received: ", req.body.type);
  return res.json({})
});

module.exports = app;
