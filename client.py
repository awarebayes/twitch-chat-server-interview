# this is a test client
# not a server
import socketio

sio = socketio.Client()

@sio.on("msg")
def message(data):
    print('I received a message!', data)

sio.connect('http://localhost:3000')
sio.emit("message_sent", "a test message be here")
sio.wait()