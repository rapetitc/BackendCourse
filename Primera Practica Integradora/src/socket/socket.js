import MessageManager from "../dao/MongoDB/managers/message.mng.js";

const msgMng = new MessageManager
const users = []

const newConnection = async (socket) => {
  try {
    const lastMsgs = await msgMng.getLatestMsgs()
    socket.emit('Server:UpdateLastMessages', lastMsgs)
  } catch (error) {
    console.log(error);
  }
  socket.emit('Server:UpdateUserList', users)
}

const useSocket = (socket) => {
  newConnection(socket)
  socket.on('Client:NewUser', (name) => {
    users.push({ id: socket.id, name })
    socket.emit('Server:UpdateUserList', users)
    socket.broadcast.emit('Server:UpdateUserList', users)
  })

  socket.on('Client:SendMsg', async (message) => {
    try {
      await msgMng.sendMsg(message)
      socket.emit('Server:MsgReceived', message)
      socket.broadcast.emit('Server:MsgReceived', message)
    } catch (error) {
      console.log(error);
    }
  })
}

export default useSocket