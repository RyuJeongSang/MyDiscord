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

wss.on("connection", (serverSocket) => {
  console.log("connect browser");
  serverSocket.on("close", () => console.log("disconnect browser"));
  serverSocket.on("message", (message) => {
    console.log(message.toString("utf-8"));
  });
  serverSocket.send("hello");
});

server.listen(3000, handleListen);
