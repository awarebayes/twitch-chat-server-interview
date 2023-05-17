import socketio

sio = socketio.Client()
@sio.event
def message(data):
    print('I received a message!', data)

sio.connect('http://localhost:3000')
sio.emit("message_sent", "a test message be here")
sio.wait()