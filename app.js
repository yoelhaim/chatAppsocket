const express = require("express");
const port = 3000;
const app = express();
const server = require("http").createServer(app);
const patch = require("path");
const cors = require("cors");
const path = require("path");
/// routes
const authroute = require("./route/authRoute");
const chatRoute = require("./route/chatRoute");

///// go route

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
var mysql = require("mysql");
const { chat } = require("./model");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
    allowedHeaders: ["x-auth-token"],
  },
});
app.use("/auth", authroute);
app.use("/c", chatRoute);
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat",
});

io.on("connection", (socket) => {
  // chatRoute;
  // io.emit("data", [
  //   {
  //     msgchat: "sssssssssssssssssssssssss",
  //     id: 1,
  //   },
  //   {
  //     msgchat: "oumoooousa",
  //     id: 2,
  //   },
  // ]);

  socket.on("add", function (data) {
    console.log("data is : " + data.msgchat);
    // con.query(
    //   "insert into `chats` (`msgchat`,`userId`,`createdAt`,`updatedAt`)VALUES('qe',1,'2021-05-03 23:10:05','2021-05-03 23:10:05')"
    // );

    socket.broadcast.emit("recev", {
      msgchat: data.msgchat,
      userId: data.id,
      user: { username_u: data.username },
      createdAt: data.time,
    });
  });
  socket.on("typing", function (data) {
    socket.broadcast.emit("typings", { nickname: data.nickname });
  });
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/chaaaat", (req, res) => {
  res.sendFile(patch.join(__dirname, "index.html"));
});
// io.attach(server);

//// vue
app.use("*", (req, res, next) => {
  if (req.baseUrl.trim() === "") {
    req.baseUrl = "index.html";
  }
  res.sendFile(path.resolve(__dirname, `./public/${req.baseUrl}`), (err) => {
    if (err) {
      res.sendFile(path.resolve(__dirname, "./public/index.html"));
    }
  });
});
server.listen(port, () => console.log("socket connect"));
server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
}
// server.listen(port, () => console.log("success"));
