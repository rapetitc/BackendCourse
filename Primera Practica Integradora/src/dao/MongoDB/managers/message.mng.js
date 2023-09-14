import messageModel from "../models/message.model.js"

class MessageManager {
  sendMsg = async (message) => {
    await messageModel.create(message)
  }
  getLatestMsgs = async () => {
    const msgs = await messageModel.find({}).limit(50)
    return msgs
  }
}

export default MessageManager