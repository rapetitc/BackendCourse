import { Schema, model } from "mongoose"

const messageSchema = new Schema({
  user: {
    type: String,
    require: true
  },
  msg: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});

const messageModel = model("messages", messageSchema)

export default messageModel