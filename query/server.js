const http = require("http");
const { app, initEvent } = require("./src/app");
const axios = require("axios");

const server = http.createServer(app);
const PORT = process.env.PORT || 4002;

server.listen(PORT, async () => {
  console.log(`listening on port: ${PORT}`);
  initEvent()
});
