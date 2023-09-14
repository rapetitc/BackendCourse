import { Schema, model } from "mongoose"

const chatSchema = new Schema({
  usersInChat: {
    type: [{
      user: Schema.Types.ObjectId
    }],
    minLenght: 1
  },
  messages: [{
    from: {
      type: Schema.Types.ObjectId,
      require: true
    },
    to: {
      type: Schema.Types.ObjectId,
      require: true
    },
    message: {
      type: String,
      minLenght: 1,
      maxLenght: 500,
      require: true
    }
  }]
}, {
  timestamps: true
});

const chatModel = model("chats", chatSchema)

export default chatModel