const http = require("http")
const express = require("express")
const path = require("path")
const { Server } = require("socket.io");
const { Socket } = require("dgram");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Socket.io
io.on("connection", (client) => {
    console.log("A user connected", client.id);
    client.on('chat message', (msg) => {
        console.log('Received message:', msg);
    });
});

app.use(express.static(path.resolve("public")));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening on port 3000");
});
