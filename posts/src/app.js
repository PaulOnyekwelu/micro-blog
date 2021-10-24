const express = require("express");
const { randomBytes } = require("crypto");

// console.log(randomBytes, randomBytes(3).toString('hex'))

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to post microservices...")
})

module.exports = app;
