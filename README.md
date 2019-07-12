##### Redis commands
1. Connect to DB redis
    ``` redis-cli -r 1 -h localhost -p 6379```
2. Subscribe to chanel by pattern
    ```psubscribe '*'```
3. Monitor events
    ```redis-cli monitor```
4. Subscribe to chanel
    ```SUBSCRIBE socket.io#/room-1#```
5. Publish message to chanel
    ```PUBLISH socket.io#/room-1# Hello```


##### Socket cheatsheet
1. sending to sender-client only
    ```js
    socket.emit('message', "some message");
    ```

2. sending to all clients, include sender
    ```js
    io.emit('message', "some message");
    ``` 

3. sending to all clients except sender
    ```js
    socket.broadcast.emit('message', "some message");
    ```

4. sending to all clients in 'game' room(channel) except sender
    ```js
    socket.broadcast.to('game').emit('message', 'nice game');
    ```

5. sending to all clients in 'game' room(channel), include sender
    ```js
    io.in('game').emit('message', 'cool game');
    ```

6. sending to sender client, only if they are in 'game' room(channel)
    ```js
    socket.to('game').emit('message', 'enjoy the game');
    ```

7. sending to all clients in namespace 'myNamespace', include sender
    ```js
    io.of('myNamespace').emit('message', 'gg');
    ```

8. sending to individual socketid
    ```js
    io.of(roomName).to(senderId).emit('message', '');
    socket.broadcast.to(socketid).emit('message', 'for your eyes only');
    ```
    
###### Help links
- https://socket.io
- https://socket.io/docs/emit-cheatsheet/
- https://socket.io/docs/rooms-and-namespaces/
- https://redis.io/topics/pubsub