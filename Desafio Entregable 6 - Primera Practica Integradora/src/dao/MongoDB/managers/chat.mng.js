import chatModel from "../models/chat.model.js"

class ChatManager {
  openChatSession = async (users) => {
    // TODO Validar si los usuarios existen
    await chatModel.create({ usersInChat: users })
  }
  sendMsg = async (cid, from, to, message) => {
    if (await chat.exists({ _id: cid }) == null) throw "Chat no encontrado"
    const chat = await chatModel.findById(cid)
    // TODO Validar si los usuarios existen, y si estan agregados al chat
    chat.messages.push({ from, to, message })
    chat.save()
  }
  getLatestMsgs = async (cid) => {
    const msgs = await chatModel.findById({ _id: cid }, "messages").limit(50)
    console.log(msgs);
  }
}

export default ChatManager