import { Schema, model } from "mongoose"

const cartSchema = new Schema({
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

// cartSchema.pre('find', function () {
//   this.populate('storage')
// });

const cartModel = model("carts", cartSchema)

export default cartModel