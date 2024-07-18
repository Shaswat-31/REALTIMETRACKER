const express = require("express");
const app = express();
const path = require('path');
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));  // Use app.use for serving static files

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});