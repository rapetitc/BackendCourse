import { Schema, model } from "mongoose"

const productSchema = new Schema({
  title: {
    type: String,
    minLength: 5,
    index: true,
    require: true
  },
  description: {
    type: String,
    minLength: 5,
    require: true
  },
  code: {
    type: String,
    minLength: 12,
    maxLength: 12,
    require: true,
    unique: true
  },
  price: {
    type: Number,
    min: 1,
    require: true
  },
  status: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    min: 1,
    require: true
  },
  category: {
    type: String,
    index: true,
    require: true
  },
  thumbnails: {
    type: [String],
    require: true
  }
}, {
  timestamps: true
});

const productModel = model("product", productSchema)

export default productModel