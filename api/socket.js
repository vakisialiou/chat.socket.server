import http from 'http'
import redis from 'redis'
import express from 'express'
import socket from 'socket.io'
import redisAdapter from 'socket.io-redis'
import { config, db } from './core/index'
import { saveMessage, saveRoom, removeRoom } from './repositories/message'

const app = express()
let server = http.createServer(app)

const io = socket(server)
io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }))

// middleware
io.of('chat').use((socket, next) => {
  // console.log(socket.handshake)
  next()
})

// socket io
io.of('chat').on('connect', (socket) => {
  socket.on('initialization', ({ rooms }) => {
    for (const room of rooms) {
      socket.join(room)
    }
  })

  socket.on('send-message', (data) => {
    saveMessage(data).then((res) => {
      if (res.status === 200) {
        io.of('chat').to(data['publicKey']).emit('add-message', data)
      }
    })
  })

  socket.on('create-room', (data) => {
    saveRoom(data).then(async (res) => {
      if (res.status === 200) {
        const room = await res.json()
        io.of('chat').emit('add-room', room)
      }
    })
  })

  socket.on('join-room', (room) => {
    socket.join(room)
  })

  socket.on('remove-room', (data) => {
    removeRoom(data).then(async (res) => {
      if (res.status === 200) {
        socket.leave(data.publicKey)
        io.of('chat').emit('remove-room', data)
      }
    })
  })

  socket.on('disconnect', () => {
    console.info(`Client gone [id=${socket.id}]`)

  });
})

server.listen(config.server.port, config.server.host, () => {
  console.log(`Socket server http://${config.server.host}:${config.server.port}`)
});