import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));

app.get('/', (req,res) => {
    res.send("Masked Backend is up and running")
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('sendMesage', (message) => {
        console.log('Message Received :', message);
        io.emit('receiveMessage', message);
    })

    socket.on('newPost', (postData) => {
        console.log('New Post Notification Received', postData);
        io.emit('newPostBroadcast', postData);
    });

    socket.on('disconnect', () => {
        console.log(`User Disconnected : ${socket.id}`);
    })
})

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Backed Server is listening on PORT :: ${PORT}`);
    console.log(`Socket.io Server is running on PORT :: ${PORT}`);
})