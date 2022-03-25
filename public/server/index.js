/* eslint-disable */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth")
const messageRoutes = require('./routes/message')
const socket = require('socket.io')

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB collection successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server start on PORT ${process.env.PORT}`);
});

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

const io = socket(server,{
  cors:{
    origin:'http://localhost:8080',
    credentials:true
  }
})
const onlineUsers = new Map()
io.on("connection",(socket)=>{
  socket.on("add-user",userId=>{
    // console.log(userId);
    onlineUsers.set(userId,socket.id)
  })

  socket.on("send-msg",data=>{
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket){
      console.log(data.msg);
      socket.to(sendUserSocket).emit("msg-recieve",data.msg)
    }
  })
})