const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

const MONGOOSE_URL = process.env.MONGOOSE_URL
const PORT = process.env.PORT

mongoose.connect(MONGOOSE_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, info) => {
        if (!err) console.log('mongoose......')
    })

app.use([
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
])

app.use('/*', (req, res, next) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Rouering... 
const AuthRouter = require('./router/Auth')
const ChatRouter = require('./router/ChatModel')
app.use('/api/', AuthRouter)
app.use('/api/', ChatRouter)

const sistaMessage = require('./socketUser/LastMessage')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
})


let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};


io.on('connection', (socket) => {

  

    // online users... visa user..
    socket.on('join', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUser', users)
        console.log(users)
    })



    //  send Message..
    socket.on('loadingMessage', ({ senderId, text, resicId }) => {
        const user = getUser(resicId)
        if (user) {
            io.to(user.socketId).emit('newMessage', { senderId, text })
        }
    })



    // sista Message...
    socket.on('NextSista', async (userId) => {
        const { chat, error } = await sistaMessage(userId)
        if (!error) socket.emit('LoadMesaa', { chat })

    })


    // disconnect users...
    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUser', users)
        console.log('logout...')
    })


})






http.listen(PORT, () => console.log(`server Ring http://localhost:${PORT}/`))