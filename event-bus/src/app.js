const express = require("express");
const axios = require("axios");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors())


app.post("/event", async (req, res) => {
  const data = req.body;

  await axios.post("http://localhost:4000/event", data)
  await axios.post("http://localhost:4001/event", data)
  await axios.post("http://localhost:4002/event", data)

  return res.json({ status: "OK" });
});

module.exports = app;
