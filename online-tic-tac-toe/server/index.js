const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

// setup express and socketio
const app = express()
const server = http.createServer(app)
const io = socketio(server)
app.use(cors())

const port = process.env.PORT || 3000

// experimental
app.get('/test', (req, res) => {
    res.send({test: 'testing'})
})


// socket.io connections
io.on('connection', (socket) => {
    console.log('new connection!')

    socket.on('updateState', (changedState) => {
        io.emit('changedState', changedState)
    })
})


// set up server listening
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})