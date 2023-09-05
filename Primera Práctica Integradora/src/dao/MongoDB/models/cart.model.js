import { Schema, model } from "mongoose"

const cartSchema = new Schema({
  storage: {
    type: [String] //TODO Cambiar para agregar el ID del producto
  }
}, {
  timestamps: true
});

const cartModel = model("carts", cartSchema)

export default cartModel