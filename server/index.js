const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const path = require("path");
const db = require("./db");
const socketio = require("socket.io");
const PORT = process.env.PORT || 2509;
const app = express();

module.exports = app;

const createApp = () => {
    // logging
    app.use(morgan("dev"));

    // body parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // compression
    app.use(compression());

    // static file-serving
    app.use(express.static(path.join(__dirname, "..", "public")));

    // routes
    app.use("/api", require("./api"));
    app.use("/auth", require("./auth"));

    // serves index.html
    app.use("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public/index.html"));
    })

    // error-handling
    app.use((err, req, res) => {
        console.error(err, err.stack);
        res.status(err.status || 500).send(err.message || "Internal server error");
    })
}

const startListening = () => {
    // start listening, create server object
    const server = app.listen(PORT, () =>
        console.log(`All systems go at ${PORT}`)
    );

    const io = socketio(server);
    require("./socket")(io);
}

const syncDb = () => db.sync();

async function startApp() {
    syncDb();
    createApp();
    startListening();
}

if(require.main === module) {
    startApp();
} else {
    createApp();
}