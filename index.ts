import { Server } from "socket.io";

const io = new Server(3000, { 
    cors: {
        origin: "*",
    }
});

type User = {
    username: string,
    color: string
}

type Message = {
    user: User,
    text: string,
}

function getRandomColor() {
    const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomMessage(): Message {
    const texts = ["LULS :))) aboba LUL", "Hiiiii!", "LMAOOOO LUL KEK LUL", "IDK LUL", "What is happening?", "Omegalul LUL pogchamp poggers", "KEKW", "KEK", "Ahaha POG LUL"]
    const text = texts[Math.floor(Math.random() * texts.length)];
    const usernames = ["Misha", "small_misha", "BIG_MISHA", "MISHA", "misha", "misha_", "ItGroup42", "ITG42"];
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    const color = getRandomColor();
    return {
        user: {
            username,
            color
        },
        text
    }
}

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message_sent", (text: string) => {
    io.emit("message", {text, user: getRandomMessage().user});
  })
});

// broadcast message to all users every 3 seconds
setInterval(() => {
    const p = Math.random();
    if (p < 0.9) {
        io.emit("message", getRandomMessage());
        return;
    }
    else {
        io.emit("join", getRandomMessage().user);
        return;
    }
}, 3000);
