import { Schema, model } from "mongoose"

const CartsSchema = new Schema({
  storage: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
}, {
  timestamps: true
});

const CartsModel = model("carts", CartsSchema)

export default CartsModel