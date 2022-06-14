import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening in http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const serverSockets = [];

wss.on("connection", (serverSocket) => {
  serverSockets.push(serverSocket);
  serverSocket["nickname"] = "Anonymous";
  const nowTime = new Date(Date.now());
  console.log("Connected to Browser✅");
  serverSocket.on("close", () => console.log("disconnect browser"));
  serverSocket.on("message", (message) => {
    const { type, payload } = JSON.parse(message);
    switch (type) {
      case "new_message":
        serverSockets.forEach((receiveSocket) => {
          receiveSocket.send(
            `${serverSocket.nickname} : ${payload} / ${nowTime.toUTCString()}`
          );
        });
        break;
      case "nickname":
        serverSocket["nickname"] = payload;
        break;
    }
  });
});

server.listen(3000, handleListen);
