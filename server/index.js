import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

const server = http.createServer(app)
const io = new SocketServer(server)

const port = process.env.PORT || 4000

io.on('connection', socket => {
    console.log('Cliente conected')

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data)
    })
});

app.use(express.static(join(__dirname, '../client/dist')))

server.listen(port);
console.log('Server on port', port)