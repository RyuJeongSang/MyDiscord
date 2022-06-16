import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit("hello");
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => socket.to(room).emit("bye"));
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", msg);
    done();
  });
});

/* 
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
}); */

const handleListen = () => console.log(`Listening in http://localhost:3000`);
httpServer.listen(3000, handleListen);
