const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const events = [];

app.get("/event", (req, res) => {
  return res.json({events});
});

app.post("/event", async (req, res) => {
  const data = req.body;
  events.push(data)

  console.log("event received: ", req.body.type);
  try {
    await axios.post("http://posts-clusterip:4000/event", data);
    await axios.post("http://comments-clusterip:4001/event", data);
    // await axios.post("http://localhost:4002/event", data);
    // await axios.post("http://localhost:4003/event", data);
  } catch (error) {
    console.log(error.message);
  }

  return res.json({ status: "OK" });
});

module.exports = app;
