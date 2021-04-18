const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const redis = require("redis");
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const client = redis.createClient();

client.subscribe("message");

app.use(cors());

http.listen(5000, () => {
  client.on("message", (channel, message) => {
    console.log(channel, message);
    io.emit("message", message);
  });
});
