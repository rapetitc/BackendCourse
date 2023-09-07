import mongoose, { Schema, model } from "mongoose"

const cartSchema = new Schema({
  storage: {
    type: [
      {
        pid: {
          type: Schema.Types.ObjectId,
          ref: "products"
        },
        quantity: {
          type: Number
        }
      }
    ]
  }
}, {
  timestamps: true
});

const cartModel = model("carts", cartSchema)

export default cartModel