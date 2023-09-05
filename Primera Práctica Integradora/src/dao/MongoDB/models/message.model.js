import { Schema, model } from "mongoose"

const messageSchema = new Schema({
  user: {
    type: String,
    minLenght: 1,
    require: true
  },
  message: {
    type: String,
    minLenght: 1,
    require: true
  }
}, {
  timestamps: true
});

const messageModel = model("message", messageSchema)

export default messageModel