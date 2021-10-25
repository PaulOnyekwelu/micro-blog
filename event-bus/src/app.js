const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/event", async (req, res) => {
  const data = req.body;

  const resp = await Promise.all([
    axios.post("http://localhost:4000", data),
    axios.post("http://localhost:4001", data),
    axios.post("http://localhost:4002", data),
  ]);
  return res.json({ status: "OK" });
});

module.exports = app;
