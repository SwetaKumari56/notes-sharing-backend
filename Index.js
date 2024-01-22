const express = require("express")
const { default: mongoose } = require("mongoose")

const { register, login, findUser } = require("./src/controllers/authentication")
const cors = require("cors")
const { validateform, verifyToken } = require("./src/Middlewares/index")
const { isValidated } = require("./src/Middlewares/index")
const { addform } = require("./src/controllers/Forms")
const { sendEmail } = require("./src/Helper/Email")
const http=require("http")
const {Server}=require("socket.io")
const server =express()
const app=http.createServer(server)
const io = new Server(app)



server.use(express.json())
server.use(cors())
server.get("/", (req, res) => {
    res.status(200).json({
        name: "Sweta",
        age: 45
    })
})
server.post("/register", register,sendEmail)

server.post("/login", login)
server.get("/get-user", verifyToken, findUser)
server.post("/add-form", validateform, isValidated, addform)
io.on("connection",socket=>{
    console.log("new user connected");
    socket.on("message",(message,room)=>{
        console.log(`New message received in ${room} and message is ${message}`);
        socket.to(room).emit("message",message)
    })
    socket.on("join",(room)=>{
        console.log(room);
        socket.join(room)
        socket.emit("joined")
    })
})
app.listen("3000",()=>{
console.log("server started")
})


mongoose.connect("mongodb://localhost:27017/XYZ").then(() => {
    console.log("DB connected ")
}).catch((error) => {
    console.log(error)
})

