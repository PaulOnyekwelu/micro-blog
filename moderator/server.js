const axios = require("axios");
const http = require("http");
const app = require("./src/app");

const server = http.createServer(app);
const PORT = process.env.PORT || 4003;

const eventHandler = async (type, data) => {
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
};

server.listen(PORT, async () => {
  console.log(`listening on port: ${PORT}`);
  try {
    const events = await axios.get("http://localhost:4005/event");
    for (let event of events.data.events) {
      eventHandler(event.type, event.data)
    }
  } catch (error) {
    console.log(error.message);
  }
});
