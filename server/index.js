const express = require("express");
const passport = require("passport");
const morgan = require("morgan");
const compression = require("compression");
const path = require("path");
const socketio = require("socket.io");
const db = require("./db");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({db});
const PORT = process.env.PORT || 2509;
const app = express();

module.exports = app;

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.models.user.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
})

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

    // sessions
    app.use(
        session({
            secret: process.env.SESSION_SECRET || "I love my girlfriend Sam",
            store: sessionStore,
            resave: false,
            saveUninitialized: false
        })
    )

    // passport
    app.use(passport.initialize());

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

    // socket control
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