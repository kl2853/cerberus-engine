module.exports = io => {
    io.on("connection", socket => {
        console.log(`Socket has connected to the server: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Disconnected: ${socket.id}`);
        })
    })
}