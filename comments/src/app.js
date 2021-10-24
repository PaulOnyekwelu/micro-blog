const express = require("express")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  return res.send("welcome to comments microservices...")
})


module.exports = app