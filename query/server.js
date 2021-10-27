const http = require("http");
const { app, eventHandler } = require("./src/app");
const axios = require("axios");

const server = http.createServer(app);
const PORT = process.env.PORT || 4002;

server.listen(PORT, async () => {
  console.log(`listening on port: ${PORT}`);
  try {
    const events = await axios.get("http://localhost:4005/event");
    for (let event of events.data.events) {
      eventHandler(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
