const express = require(`express`);
const WebSocket = require(`ws`);
const helmet = require(`helmet`);
const hpp = require(`hpp`);

// App config
const app = express();
const port = process.env.PORT || 3030;

// Middlewares
app.use(helmet());
app.use(hpp());

// DB conifg

// API endpoints
app.get(`/`, (req, res) => {
    res.status(200).send({ description: `WebSocket Server` });
})

// Listener
const wss = new WebSocket.Server({
    server: app.listen(
        port,
        console.log(`WebSocket Server is running on port http://localhost:${port}`)
    ),
    host: `localhost`,
    path: `/`
})

// Socket
wss.on(`connection`, (ws) => {
    ws.send(`Welcome, User.`);

    ws.on(`message`, (msg) => {
        ws.send(msg.toString());
    })
})