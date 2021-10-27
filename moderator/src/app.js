const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/event", async (req, res) => {
  const { type, data } = req.body;

  console.log("event received: ", type);

  if (type === "CommentCreated") {
    const { content, id, postId } = data;
    const status = content.toLowerCase().includes("fuck")
      ? "rejected"
      : "accepted";

    await axios.post("http://localhost:4005/event", {
      type: "CommentModerated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
  return res.json({});
});

module.exports = app;
