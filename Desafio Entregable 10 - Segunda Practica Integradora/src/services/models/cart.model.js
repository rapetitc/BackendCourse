import { Schema, model } from "mongoose"

const CartSchema = new Schema({
  storage: {
    type: [
      {
        pid: {
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

CartSchema.pre('find', function () {
  this.populate('storage.pid')
});

const CartModel = model("carts", CartSchema)

export default CartModel